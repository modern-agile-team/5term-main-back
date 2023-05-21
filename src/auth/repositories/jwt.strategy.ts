import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as config from 'config';
import { UserRepository } from 'src/user/repositories/user.repository';
import { User } from 'src/user/entities/user.entity';

const jwtConfig = config.get('jwt');

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userRepository: UserRepository) {
    super({
      secretOrKey: jwtConfig.secretKey,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload): Promise<any> {
    const { userId } = payload;

    const user = await this.userRepository.findUserByNo(userId);

    if (!user) {
      throw new UnauthorizedException();
    }

    return payload;
  }
}
