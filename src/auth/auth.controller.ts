import {
  Body,
  Controller,
  Post,
  HttpCode,
  BadRequestException,
  Get,
  Res,
  Query,
  Param,
} from '@nestjs/common';
import { AuthService, KakaoLogin } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { DuplicationCheckDto } from './dto/duplicationCheck.dto';
import { ApiOperation } from '@nestjs/swagger';
import { log } from 'console';

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
  @Get('/id-duplication-ckecking/:id')
  @HttpCode(200)
  async idDuplicationChekc(@Param('id') id: DuplicationCheckDto) {
    console.log('확인');
    const result = await this.authService.idDuplicationCheck(id);

    if (!result) {
      throw new BadRequestException('아이디 중복');
    }
  }

  @ApiOperation({
    summary: '닉네임 중복체크',
    description: '닉네임 중복체크한다.',
  })
  @Get('/nickname-duplication-ckecking/:nickname')
  @HttpCode(200)
  async nicknameDuplicationChekc(
    @Param('nickname') nickname: DuplicationCheckDto,
  ) {
    const result = await this.authService.nicknameDuplicationCheck(nickname);

    if (!result) {
      throw new BadRequestException('닉네임 중복');
    }
  }
}
