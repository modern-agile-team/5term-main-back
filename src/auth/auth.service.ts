import { Injectable } from '@nestjs/common';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthSocialLoginRepository } from './repositories/authSocialLogin.repository';
import { AuthPasswordLoginRepository } from './repositories/authPasswordLogin.repository';
import { UserRepository } from './../user/repositories/user.repository';
import { UserProfileRepository } from 'src/user/repositories/userProfile.repository';
import { UserProfile } from './../user/entities/user_profile.entity';
import { User } from 'src/user/entities/user.entity';

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
  ) {}
  async singUp(authCredentialDto: AuthCredentialDto) {
    const user: User = (
      await this.userRepository.createUser(authCredentialDto, 0)
    ).raw[0];

    const result1 = await this.userProfileRepository.createUserProfile(
      authCredentialDto,
      user,
    );

    const result2 = await this.authPasswordLoginRepository.createPasswordUser(
      authCredentialDto,
      user,
    );

    console.log(result1);
    console.log(result2);
  }
}
