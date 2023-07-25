import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthCredentialDto } from '@src/auth/dtos/auth-credential.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthPasswordLoginRepository } from '@src/auth/repositories/auth-password-login.repository';
import { UserRepository } from '@src/user/repositories/user.repository';
import { User } from '@src/user/entities/user.entity';
import { UserProfileRepository } from '@src/user/repositories/user-profile.repository';
import {
  IdDuplicationCheckDto,
  NicknameDuplicationCheckDto,
} from '@src/auth/dtos/duplication-check.dto';
import { JwtService } from '@nestjs/jwt';
import { RedisService } from '@src/common/redis/redis.service';
import { LoginDto } from '@src/auth/dtos/login.dto';
import { UserImageRepository } from '@src/user/repositories/user-image.repository';
import { UserProfile } from '@src/user/entities/user-profile.entity';
import { UserImage } from '@src/user/entities/user-image.entity';
import { AuthPasswordLogin } from '@src/auth/entities/auth-password-login.entity';
import axios from 'axios';
import * as config from 'config';
import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';
import { ChangePasswordDto } from '@src/auth/dtos/change-password.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthPasswordLoginRepository)
    private authPasswordLoginRepository: AuthPasswordLoginRepository,
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    @InjectRepository(UserProfileRepository)
    private userProfileRepository: UserProfileRepository,
    @InjectRepository(UserImageRepository)
    private userImageRepositoy: UserImageRepository,
    private jwtService: JwtService,
    private redisService: RedisService,
  ) {}

  async singUp(authCredentialDto: AuthCredentialDto) {
    const { id, nickname } = authCredentialDto;

    const isIdDuplication = await this.userRepository.idDuplicationCheck(id);

    const isNicknameDuplication =
      await this.userProfileRepository.nicknameDuplicationCheck(nickname);

    if (isIdDuplication) {
      throw new BadRequestException('아이디 중복');
    }

    if (isNicknameDuplication) {
      throw new BadRequestException('닉네임 중복');
    }

    const user: User = await this.userRepository.createUser(
      authCredentialDto.id,
      0,
    );

    const userImage: UserImage = await this.userImageRepositoy.createUserImg(
      user,
    );

    const userProfile: UserProfile =
      await this.userProfileRepository.createUserProfile(
        authCredentialDto,
        user,
        userImage,
      );

    const { password } = authCredentialDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const authUser = { password: hashedPassword, user };
    const authPasswordLogin: AuthPasswordLogin =
      await this.authPasswordLoginRepository.createPasswordUser(authUser);

    return { ...userProfile, ...userImage, ...authPasswordLogin, ...user };
  }
  async idDuplicationCheck(idDuplicationCheckDto: IdDuplicationCheckDto) {
    const { id } = idDuplicationCheckDto;
    return await this.userRepository.idDuplicationCheck(id);
  }

  async nicknameDuplicationCheck(nicknameDto: NicknameDuplicationCheckDto) {
    const { nickname } = nicknameDto;
    return await this.userProfileRepository.nicknameDuplicationCheck(nickname);
  }

  async phoneDuplicationCheck(phoneNumber: number) {
    return await this.userProfileRepository.phoneDuplicationCheck(phoneNumber);
  }

  async smsCertification(toPhoneNumber: number) {
    const phoneNumber = toPhoneNumber;
    if (await this.phoneDuplicationCheck(toPhoneNumber)) {
      throw new BadRequestException('중복 전화번호');
    }

    const smsConfig = config.get('sms');

    const certificationNumber = Math.floor(Math.random() * 1000000);

    const messages = [];
    const timestamp = new Date().getTime();
    const method = 'POST';
    const space = ' ';
    const newLine = '\n';
    const fromPhoneNumber = smsConfig.myPhoneNumber;
    const accessKey = smsConfig.accessKeyId;
    const serviceId = smsConfig.serviceId;
    const secretKey = smsConfig.secretKey;
    const content = `인증번호는 ${certificationNumber} 입니다.`;

    const hmac = crypto.createHmac('sha256', secretKey);

    const url1 = `https://sens.apigw.ntruss.com/sms/v2/services/${serviceId}/messages`;
    const url2 = `/sms/v2/services/${serviceId}/messages`;

    messages.push(method);
    messages.push(space);
    messages.push(url2);
    messages.push(newLine);
    messages.push(timestamp);
    messages.push(newLine);
    messages.push(accessKey);

    const signiture = hmac.update(messages.join('')).digest('base64');

    const headers = {
      'Content-Type': 'application/json; charset=utf-8',
      'x-ncp-apigw-timestamp': timestamp,
      'x-ncp-iam-access-key': accessKey,
      'x-ncp-apigw-signature-v2': signiture,
    };

    const data = {
      type: 'SMS',
      countryCode: '82',
      from: fromPhoneNumber,
      content,
      messages: [
        {
          to: `${phoneNumber}`,
        },
      ],
    };

    const result = (await axios.post(url1, data, { headers })).data;

    if (result.statusCode != 202) {
      throw new InternalServerErrorException('문자전송 실패');
    }

    return certificationNumber;
  }

  async login(loginDto: LoginDto) {
    const { id, password } = loginDto;
    const user = await this.userRepository.login(id);
    if (!user) {
      throw new BadRequestException('없는 아이디');
    }
    const isPasswordOk = await bcrypt.compare(password, user.password);

    if (isPasswordOk) {
      const accessToken = await this.createAccessToken(user);
      const refreshToken = await this.createRefreshToken(user);

      return { accessToken, refreshToken };
    }

    throw new BadRequestException('비밀번호가 틀렸습니다.');
  }

  async createAccessToken(user: User) {
    const accessPayload = {
      userId: user.id,
      type: 'ACCESS',
      loginType: user.loginType,
    };

    const accessToken = await this.jwtService.sign(accessPayload);

    return accessToken;
  }

  async createRefreshToken(user: User) {
    const jwtConfig = config.get('jwt');
    const refreshPayload = { userId: user.id, type: 'REFRESH' };

    const refreshToken = await this.jwtService.sign(refreshPayload, {
      secret: jwtConfig.secretKey,
      expiresIn: jwtConfig.refreshExpiresIn,
    });

    await this.redisService.set(String(user.id), refreshToken, {
      ttl: jwtConfig.refreshExpiresIn,
    });

    return refreshToken;
  }

  async recreateToken(userId: number) {
    const payload = { userId: userId, type: 'ACCESS' };

    const accessToken = await this.jwtService.sign(payload);

    return accessToken;
  }

  async logout(userId: number) {
    await this.redisService.del(String(userId));
  }

  async accessTokenValidation(expirationPeriod: number) {
    const timestemp = Math.floor(+new Date() / 1000);
    const leftTime = expirationPeriod - timestemp;

    if (leftTime < 600) {
      throw new UnauthorizedException('유효 시간 10분 미만');
    }
    return { leftTime };
  }

  async changPassword(userNo: number, changePasswordDto: ChangePasswordDto) {
    return this.authPasswordLoginRepository.changePassword(
      userNo,
      changePasswordDto,
    );
  }
}
