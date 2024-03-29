import { Module } from '@nestjs/common';
import { AuthService } from '@src/auth/services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthSocialLoginRepository } from './repositories/auth-social-login.repository';
import { UserRepository } from 'src/user/repositories/user.repository';
import { AuthPasswordLoginRepository } from './repositories/auth-password-login.repository';
import { UserProfileRepository } from 'src/user/repositories/user-profile.repository';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '@src/config/strategis/jwt-access-token.strategy';
import { RedisModule } from '@src/common/redis/redis.module';
import JwtRefreshStrategy from '@src/config/strategis/jwt-refresh-token.strategy';
import { UserImageRepository } from 'src/user/repositories/user-image.repository';
import { AuthSocialService } from '@src/auth/services/auth-social.service';
import { AuthSocialController } from '@src/auth/controllers/auth-social.controller';
import * as config from 'config';

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
  providers: [AuthService, AuthSocialService, JwtStrategy, JwtRefreshStrategy],
  controllers: [AuthController, AuthSocialController],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
