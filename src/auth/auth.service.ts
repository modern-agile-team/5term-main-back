import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthSocialLoginRepository } from './repositories/authSocialLogin.repository';
import { AuthPasswordLoginRepository } from './repositories/authPasswordLogin.repository';
import { UserRepository } from './../user/repositories/user.repository';
import { User } from 'src/user/entities/user.entity';
import { UserProfileRepository } from 'src/user/repositories/userProfile.repository';
import {
  IdDuplicationCheckDto,
  NicknameDuplicationCheckDto,
  PhoneDuplicationCheckDto,
} from './dto/duplicationCheck.dto';
import axios from 'axios';
import * as config from 'config';
import * as crypto from 'crypto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthSocialLoginRepository)
    private authSocialLoginRepository: AuthSocialLoginRepository,
    @InjectRepository(AuthPasswordLoginRepository)
    private authPasswordLoginRepository: AuthPasswordLoginRepository,
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    @InjectRepository(UserProfileRepository)
    private userProfileRepository: UserProfileRepository,
    private jwtService: JwtService,
    private redisService: RedisService,
  ) {}

  async singUp(authCredentialDto: AuthCredentialDto) {
    const id: IdDuplicationCheckDto = { id: authCredentialDto.id };
    const nickname: NicknameDuplicationCheckDto = {
      nickname: authCredentialDto.nickname,
    };

    const idDuplicationCheckingResult = await this.idDuplicationCheck(id);
    const nicknameDuplicationCheckingResult =
      await this.nicknameDuplicationCheck(nickname);

    if (idDuplicationCheckingResult) {
      throw new BadRequestException('아이디 중복');
    }

    if (nicknameDuplicationCheckingResult) {
      throw new BadRequestException('닉네임 중복');
    }

    const user: User = (
      await this.userRepository.createUser(authCredentialDto, 0)
    ).raw[0];

    const result = await this.userProfileRepository.createUserProfile(
      authCredentialDto,
      user,
    );

    await this.authPasswordLoginRepository.createPasswordUser(
      authCredentialDto,
      user,
    );
  }

  async idDuplicationCheck(id: IdDuplicationCheckDto) {
    const result = await this.userRepository.idDuplicationCheck(id);

    return result;
  }

  async nicknameDuplicationCheck(nickname: NicknameDuplicationCheckDto) {
    const result = await this.userProfileRepository.nicknameDuplicationCheck(
      nickname,
    );

    return result;
  }

  async phoneDuplicationCheck(phoneNumber: PhoneDuplicationCheckDto) {
    const result = await this.userProfileRepository.phoneDuplicationCheck(
      phoneNumber,
    );

    return result ? true : false;
  }

  async smsCertification(toPhoneNumber: PhoneDuplicationCheckDto) {
    const { phoneNumber } = toPhoneNumber;
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
    const jwtConfig = config.get('jwt');
    const user = await this.userRepository.login(id);
    if (!user) {
      throw new BadRequestException('없는 아이디');
    }
    const isPasswordOk = await bcrypt.compare(password, user.password);

    if (isPasswordOk) {
      const accessPayload = { userId: user.id, type: 'ACCESS' };
      const refreshPayload = { userId: user.id, type: 'REFRESH' };
      const accessToken = await this.jwtService.sign(accessPayload);
      const refreshToken = await this.jwtService.sign(refreshPayload, {
        secret: jwtConfig.secretKey,
        expiresIn: jwtConfig.refreshExpiresIn,
      });

      await this.redisService.set(String(user.id), refreshToken, {
        ttl: jwtConfig.refreshExpiresIn,
      });

      await this.redisService.get(String(user.id));

      return { accessToken, refreshToken };
    }

    throw new BadRequestException('비밀번호가 틀렸습니다.');
  }

  async recreateToken(userId: number) {
    const payload = { userId: userId, type: 'ACCESS' };
    const isLogin = await this.redisService.get(String(userId));

    if (!isLogin) {
      throw new UnauthorizedException();
    }
    const accessToken = await this.jwtService.sign(payload);

    return { accessToken };
  }

  async logout(userId: number) {
    await this.redisService.del(String(userId));
  }
}
