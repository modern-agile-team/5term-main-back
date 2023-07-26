import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as config from 'config';
import { RedisService } from '@src/common/redis/redis.service';

const jwtConfig = config.get('jwt');

@Injectable()
export class JwtStrategy extends PassportStrategy(
  Strategy,
  'jwt-access-token',
) {
  constructor(private redisService: RedisService) {
    super({
      secretOrKey: jwtConfig.secretKey,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload) {
    const { userId } = payload;

    const result = await this.redisService.get(String(userId));

    if (!result) {
      throw new UnauthorizedException('로그인되어 있지 않은 토큰');
    }

    return payload;
  }
}
