import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as config from 'config';
import { RedisService } from 'src/redis/redis.service';

const jwtConfig = config.get('jwt');

@Injectable()
export default class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token',
) {
  constructor(private readonly redisService: RedisService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request) => {
          return request?.headers.cookie.substring(8);
        },
      ]),
      secretOrKey: jwtConfig.secretKey,
      passReqToCallback: true,
    });
  }
  async validate(req, payload: any) {
    const { userId } = payload;
    const token = req.headers.cookie.substring(8);
    const result = await this.redisService.get(String(userId));

    if (token !== result) {
      throw new UnauthorizedException('확인 안된 리프레시 토큰');
    }

    return userId;
  }
}
