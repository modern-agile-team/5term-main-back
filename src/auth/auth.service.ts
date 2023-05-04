import { Injectable } from '@nestjs/common';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthSocialLoginRepository } from './repositories/authSocialLogin.repository';
import { AuthPasswordLoginRepository } from './repositories/authPasswordLogin.repository';
import { UserRepository } from './../user/repositories/user.repository';
import { User } from 'src/user/entities/user.entity';
import { UserProfileRepository } from 'src/user/repositories/userProfile.repository';
import { DuplicationCheckDto } from './dto/duplicationCheck.dto';
import axios from 'axios';

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

    await this.userProfileRepository.createUserProfile(authCredentialDto, user);

    await this.authPasswordLoginRepository.createPasswordUser(
      authCredentialDto,
      user,
    );
  }

  async idDuplicationCheck(id: DuplicationCheckDto) {
    const result = await this.userRepository.idDuplicationCheck(id);

    return result ? false : true;
  }

  async nicknameDuplicationCheck(nickname: DuplicationCheckDto) {
    const result = await this.userProfileRepository.nicknameDuplicationCheck(
      nickname,
    );

    return result ? false : true;
  }
}

@Injectable()
export class KakaoLogin {
  async login(url: string) {
    const response = await axios.post(url);
    return response;
  }
}
