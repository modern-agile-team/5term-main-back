import {
  Body,
  Controller,
  Post,
  HttpCode,
  BadRequestException,
  Get,
  Res,
  Query,
} from '@nestjs/common';
import { AuthService, KakaoLogin } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { DuplicationCheckDto } from './dto/duplicationCheck.dto';
import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly kakaologin: KakaoLogin,
  ) {}

  @Post('/signup')
  @HttpCode(200)
  singUp(@Body() authCredentialDto: AuthCredentialDto) {
    return this.authService.singUp(authCredentialDto);
  }

  @Post('/id-duplication-ckeck')
  @HttpCode(200)
  async idDuplicationChekc(@Body() duplicationCheckDto: DuplicationCheckDto) {
    const result = await this.authService.idDuplicationCheck(
      duplicationCheckDto,
    );

    if (!result) {
      throw new BadRequestException('아이디 중복');
    }
  }

  @Post('/nickname-duplication-ckeck')
  @HttpCode(200)
  async nicknameDuplicationChekc(
    @Body() duplicationCheckDto: DuplicationCheckDto,
  ) {
    const result = await this.authService.nicknameDuplicationCheck(
      duplicationCheckDto,
    );

    if (!result) {
      throw new BadRequestException('닉네임 중복');
    }
  }

  @Get('/kakaoLogin')
  async kakaoLogin(@Res() res) {
    const restApiKey = '8116e21560b6c70c6e6d5f0e9e1d8303'; // * 입력필요
    // 카카오 로그인 RedirectURI 등록
    const redirectUrl = 'http://localhost:3001/auth/kakaoLoginRedirect';
    const url = `https://kauth.kakao.com/oauth/authorize?client_id=${restApiKey}&redirect_uri=${redirectUrl}&response_type=code`;
    return res.redirect(url);
  }

  @Get('/kakaoLoginRedirect')
  async kakaoLoginRedirect(@Query('code') code: string) {
    const restApiKey = '8116e21560b6c70c6e6d5f0e9e1d8303';
    const redirect_uri = 'http://localhost:3001/auth/kakaoLoginRedirect';
    const hostName = `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${restApiKey}&redirect_uri=${redirect_uri}&code=${code}`;

    const response = await axios.post(hostName);
    const token = response.data.access_token;
    console.log('data');
    console.log(response.data);
  }

  @Post('/kakaoUnlink')
  async kakaoUnlink(@Body() data) {
    const ACCESS_TOKEN = data.ACCESS_TOKEN;

    const res = await axios.post('https://kapi.kakao.com/v1/user/unlink', {
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });
    console.log(res);
  }
}
