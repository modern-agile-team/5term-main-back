import {
  Body,
  Controller,
  Post,
  HttpCode,
  BadRequestException,
  Get,
  Param,
} from '@nestjs/common';
import { AuthService, KakaoLogin } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { DuplicationCheckDto } from './dto/duplicationCheck.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly kakaologin: KakaoLogin,
  ) {}
  @ApiOperation({ summary: '회원가입', description: '회원가입' })
  @ApiBody({ type: AuthCredentialDto })
  @Post('/signup')
  @HttpCode(200)
  singUp(@Body() authCredentialDto: AuthCredentialDto) {
    return this.authService.singUp(authCredentialDto);
  }

  @Get('/id-duplication-ckecking/:id')
  @ApiOperation({ summary: 'id중복체크', description: 'id를 중복체크한다.' })
  @ApiResponse({
    status: 200,
    description: 'id 중복 없음',
  })
  @ApiResponse({
    status: 400,
    description: 'id 중복',
  })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'id입력',
    example: 'id123',
    required: true,
  })
  @HttpCode(200)
  async idDuplicationChekc(@Param('id') id: DuplicationCheckDto) {
    const result = await this.authService.idDuplicationCheck(id);

    if (!result) {
      throw new BadRequestException('아이디 중복');
    }
  }

  @Get('/nickname-duplication-ckecking/:nickname')
  @ApiOperation({
    summary: '닉네임 중복체크',
    description: '닉네임 중복체크한다.',
  })
  @ApiParam({
    name: 'nickname',
    type: 'string',
    description: '닉네임 입력',
    example: '닉네임',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: '닉네임 중복 없음',
  })
  @ApiResponse({
    status: 400,
    description: '닉네임 중복',
  })
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
