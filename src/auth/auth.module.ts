import { Module } from '@nestjs/common';
import { AuthService, KakaoLogin } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthSocialLoginRepository } from './repositories/authSocialLogin.repository';
import { UserRepository } from 'src/user/repositories/user.repository';
import { AuthPasswordLoginRepository } from './repositories/authPasswordLogin.repository';
import { UserProfileRepository } from 'src/user/repositories/userProfile.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AuthSocialLoginRepository,
      UserRepository,
      AuthPasswordLoginRepository,
      UserProfileRepository,
    ]),
  ],
  providers: [AuthService, KakaoLogin],
  controllers: [AuthController],
})
export class AuthModule {}
