import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
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
import { error } from 'console';

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
    const duplicationCheckDto: DuplicationCheckDto = authCredentialDto;

    const idDuplicationCheckingResult = await this.idDuplicationCheck(
      duplicationCheckDto,
    );
    const nicknameDuplicationCheckingResult =
      await this.nicknameDuplicationCheck(duplicationCheckDto);

    if (idDuplicationCheckingResult) {
      throw new BadRequestException('아이디 중복');
    }

    if (nicknameDuplicationCheckingResult) {
      throw new BadRequestException('닉네임 중복');
    }

    const user: User = (
      await this.userRepository.createUser(authCredentialDto, 0)
    ).raw[0];

    await this.userProfileRepository.createUserProfile(authCredentialDto, user);

    await this.authPasswordLoginRepository.createPasswordUser(
      authCredentialDto,
      user,
    );
  }

  async idDuplicationCheck(duplicationCheckDto: DuplicationCheckDto) {
    const result = await this.userRepository.idDuplicationCheck(
      duplicationCheckDto,
    );

    return result;
  }

  async nicknameDuplicationCheck(duplicationCheckDto: DuplicationCheckDto) {
    const result = await this.userProfileRepository.nicknameDuplicationCheck(
      duplicationCheckDto,
    );

    return result;
  }

  async phoneDuplicationCheck(phoneNumber: number) {
    const result = await this.userProfileRepository.phoneDuplicationCheck(
      phoneNumber,
    );

    return result ? true : false;
  }

  async smsCertification(toPhoneNumber: number) {
    if (await this.phoneDuplicationCheck(toPhoneNumber)) {
      throw new BadRequestException('중복 전화번호');
    }

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
    const content = `인증번호는 ${certificationNumber} 입니다.`;

    const hmac = crypto.createHmac('sha256', secretKey);

    const url1 = `https://sens.apigw.ntruss.com/sms/v2/services/${serviceId}/messages`;
    const url2 = `/sms/v2/services/${serviceId}/messages`;

    messages.push(method);
    messages.push(space);
    messages.push(url2);
    messages.push(newLine);
    messages.push(timestamp);
    messages.push(newLine);
    messages.push(accessKey);

    const signiture = hmac.update(messages.join('')).digest('base64');

    const headers = {
      'Content-Type': 'application/json; charset=utf-8',
      'x-ncp-apigw-timestamp': timestamp,
      'x-ncp-iam-access-key': accessKey,
      'x-ncp-apigw-signature-v2': signiture,
    };

    const data = {
      type: 'SMS',
      countryCode: '82',
      from: fromPhoneNumber,
      content,
      messages: [
        {
          to: `${toPhoneNumber.toString()}`,
        },
      ],
    };

    const result = (await axios.post(url1, data, { headers })).data;

    if (result.statusCode != 202) {
      throw new InternalServerErrorException('문자전송 실패');
    }

    return certificationNumber;
  }
}
