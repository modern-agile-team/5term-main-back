import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { AuthSocialLoginRepository } from '../repositories/auth-social-login.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/user/repositories/user.repository';
import { UserProfileRepository } from 'src/user/repositories/user-profile.repository';
import { UserImageRepository } from 'src/user/repositories/user-image.repository';
import { RedisService } from 'src/common/redis/redis.service';
import axios from 'axios';
import { AuthSocialLogin } from '../entities/auth-social-login.entity';
import { AuthService } from './auth.service';
import * as config from 'config';
import { User } from 'src/user/entities/user.entity';
import { SocialUserProfileDto } from '../dtos/social-user-profile.dto';
import { UserImage } from 'src/user/entities/user-image.entity';
import { UserProfile } from 'src/user/entities/user-profile.entity';

@Injectable()
export class AuthSocialService {
  constructor(
    @InjectRepository(AuthSocialLoginRepository)
    private authSocialLoginRepository: AuthSocialLoginRepository,
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    @InjectRepository(UserProfileRepository)
    private userProfileRepository: UserProfileRepository,
    @InjectRepository(UserImageRepository)
    private userImageRepositoy: UserImageRepository,
    private redisService: RedisService,
    private authService: AuthService,
  ) {}

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

      const accessToken = await this.authService.createAccessToken(user);
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

    const accessToken = await this.authService.createAccessToken(user);
    const refreshToken = await this.authService.createRefreshToken(user);

    return { accessToken, refreshToken };
  }

  async socialSingUp(
    userId: number,
    socialUserProfileDto: SocialUserProfileDto,
  ): Promise<{
    accessToken: string;
    refreshToken: string;
    profile: UserProfile;
  }> {
    const user: User = await this.userRepository.getUserId({ userId });
    const userImageData: UserImage =
      await this.userImageRepositoy.createUserImg(user);
    const profile: UserProfile =
      await this.userProfileRepository.createSocialUserProfile(
        user,
        socialUserProfileDto,
        userImageData,
      );
    if (!profile) {
      throw new InternalServerErrorException('프로필 기입 실패');
    }

    const accessToken: string = await this.authService.createAccessToken(user);
    const refreshToken: string = await this.authService.createRefreshToken(
      user,
    );

    return { accessToken, refreshToken, profile };
  }

  async socialLogout(userId: number): Promise<object> {
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

    return { messege: '소셜 로그아웃 성공' };
  }

  async socialUnlick(userId: number): Promise<object> {
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
