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
import { ApiOperation } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly kakaologin: KakaoLogin,
  ) {}
  @ApiOperation({ summary: '회원가입', description: '회원가입' })
  @Post('/signup')
  @HttpCode(200)
  singUp(@Body() authCredentialDto: AuthCredentialDto) {
    return this.authService.singUp(authCredentialDto);
  }

  @ApiOperation({ summary: 'id중복체크', description: 'id를 중복체크한다.' })
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

  @ApiOperation({
    summary: '닉네임 중복체크',
    description: '닉네임 중복체크한다.',
  })
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
}
