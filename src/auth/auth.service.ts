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
import * as config from 'config';
import * as crypto from 'crypto';

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

  async smsCertification(toPhoneNumber: number) {
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
    const content = `[web 발송] \n 인증번호는 ${certificationNumber} 입니다.`;

    const hmac = crypto.createHmac('sha256', secretKey);

    const url1 = `https://sens.apigw.ntruss.com/sms/v2/services/${serviceId}/messages`;
    const url2 = `/sms/v2/services/${serviceId}/messages`;

    hmac.update(method);
    hmac.update(space);
    hmac.update(url2);
    hmac.update(newLine);
    hmac.update(timestamp.toString());
    hmac.update(newLine);
    hmac.update(accessKey);

    messages.push();

    const headers = {
      'Content-Type': 'application/json; charset=utf-8',
      'x-ncp-apigw-timestamp': timestamp,
      'x-ncp-iam-access-key': accessKey,
      'x-ncp-apigw-signature-v2': secretKey,
    };

    const data = {
      type: 'SMS',
      countryCode: '82',
      from: fromPhoneNumber,
      messages: [
        {
          to: `${toPhoneNumber}`,
          content,
        },
      ],
    };

    const res = await axios.post(url1, data, { headers });
    console.log(res.data);
  }
}
