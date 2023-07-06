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
} from './dto/duplicationCheck.dto';
import axios from 'axios';
import * as config from 'config';
import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RedisService } from 'src/redis/redis.service';
import { LoginDto } from './dto/login.dto';
import { UserImageRepository } from 'src/user/repositories/userImage.repository';
import { UserProfile } from 'src/user/entities/user_profile.entity';
import { UserImage } from 'src/user/entities/user_image.entity';
import { AuthPasswordLogin } from './entities/auth_password_login.entity';
import { AuthSocialLogin } from './entities/auth_social_login.entity';
import { SocialUserProfileDto } from './dto/socialUserProfile.dto';

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
    @InjectRepository(UserImageRepository)
    private userImageRepositoy: UserImageRepository,
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

    const authPasswordLogin: AuthPasswordLogin =
      await this.authPasswordLoginRepository.createPasswordUser(
        authCredentialDto,
        user,
      );

    return { ...userProfile, ...userImage, ...authPasswordLogin, ...user };
  }

  async idDuplicationCheck(id: IdDuplicationCheckDto) {
    return await this.userRepository.idDuplicationCheck(id);
  }

  async nicknameDuplicationCheck(nickname: NicknameDuplicationCheckDto) {
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

  async socialLogin(authorizeCode) {
    authorizeCode;
    const socialConfig = config.get('socialLogin');
    const URL = 'https://kauth.kakao.com/oauth/token';
    const userDataUrl = 'https://kauth.kakao.com/oauth/tokeninfo';
    const restApiKey = socialConfig.restApiKey;
    const redirectUri = socialConfig.redirectUrl;

    const headers = {
      'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    };

    const body = {
      grant_type: 'authorization_code',
      client_id: restApiKey,
      redirect_uri: redirectUri,
      code: authorizeCode,
    };

    const result = (await axios.post(URL, body, { headers })).data;

    const { id_token } = result;
    const userData = (await axios.post(userDataUrl, { id_token }, { headers }))
      .data;
    const { email, sub } = userData;

    const isOurUser: AuthSocialLogin =
      await this.authSocialLoginRepository.getUserById(sub);

    if (!isOurUser) {
      const user: User = await this.userRepository.createUser(email, 1);
      await this.authSocialLoginRepository.createSocialUser(
        sub,
        result.access_token,
        user,
      );

      const accessToken = await this.createAccessToken(user);
      await this.redisService.set(`${user.id}`, result.access_token);

      return { accessToken };
    }

    await this.authSocialLoginRepository.updateSocialAccessToken(
      isOurUser.id,
      result.access_token,
    );

    const user: User = await this.userRepository.getUserId({
      userId: isOurUser.userId,
    });

    const accessToken = await this.createAccessToken(user);
    const refreshToken = await this.createRefreshToken(user);

    return { accessToken, refreshToken };
  }

  async socialSingUp(
    userId: number,
    socialUserProfileDto: SocialUserProfileDto,
  ) {
    const user: User = await this.userRepository.getUserId({ userId });
    const userImageData = await this.userImageRepositoy.createUserImg(user);
    const profile = await this.userProfileRepository.createSocialUserProfile(
      user,
      socialUserProfileDto,
      userImageData,
    );
    if (!profile) {
      throw new InternalServerErrorException('프로필 기입 실패');
    }

    const accessToken = await this.createAccessToken(user);
    const refreshToken = await this.createRefreshToken(user);

    return { accessToken, refreshToken, profile };
  }

  async socialLogout(userId: number) {
    const unlinkUrl = 'https://kapi.kakao.com/v1/user/logout';
    const socialUser: AuthSocialLogin =
      await this.authSocialLoginRepository.getUserByUserId(userId);
    const { accessToken } = socialUser;
    const headers = {
      'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      Authorization: `Bearer ${accessToken}`,
    };

    await axios.post(unlinkUrl, {}, { headers });

    await this.authSocialLoginRepository.updateSocialAccessToken(
      socialUser.id,
      '',
    );

    await this.redisService.del(String(userId));

    return { messege: 'social logout success' };
  }

  async socialUnlick(userId: number) {
    const unlinkUrl = 'https://kapi.kakao.com/v1/user/unlink';
    const socialUser: AuthSocialLogin =
      await this.authSocialLoginRepository.getUserByUserId(userId);
    const { accessToken } = socialUser;
    const headers = {
      'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      Authorization: `Bearer ${accessToken}`,
    };

    await axios.post(unlinkUrl, {}, { headers });

    const deleteResult = await this.userRepository.deleteUser(userId);
    if (deleteResult.affected) {
      throw new InternalServerErrorException('소셜로그인 연결끊기 실패');
    }

    return { massege: '회원탈퇴 성공' };
  }
}
