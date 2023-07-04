import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthSocialLoginRepository } from './repositories/authSocialLogin.repository';
import { UserRepository } from 'src/user/repositories/user.repository';
import { AuthPasswordLoginRepository } from './repositories/authPasswordLogin.repository';
import { UserProfileRepository } from 'src/user/repositories/userProfile.repository';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import * as config from 'config';
import { JwtStrategy } from './strategis/jwt.strategy';
import { RedisModule } from 'src/redis/redis.module';
import JwtRefreshStrategy from './strategis/jwt-refresh_token.strategy';
import { UserImageRepository } from 'src/user/repositories/userImage.repository';

const jwtConfig = config.get('jwt');

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AuthSocialLoginRepository,
      UserRepository,
      AuthPasswordLoginRepository,
      UserProfileRepository,
      UserImageRepository,
    ]),
    PassportModule,
    JwtModule.register({
      secret: jwtConfig.secretKey,
      signOptions: {
        expiresIn: jwtConfig.expiresIn,
      },
    }),
    RedisModule,
  ],
  providers: [AuthService, JwtStrategy, JwtRefreshStrategy],
  controllers: [AuthController],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
