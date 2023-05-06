import {
  Body,
  Controller,
  Post,
  HttpCode,
  BadRequestException,
  Get,
  Param,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { DuplicationCheckDto } from './dto/duplicationCheck.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { SmsCertificationDto } from './dto/smsCertification.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
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
  async idDuplicationChekc(@Param('id') id: string) {
    const duplicationCheckDto: DuplicationCheckDto = { id };
    const result = await this.authService.idDuplicationCheck(
      duplicationCheckDto,
    );

    if (result) {
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
  async nicknameDuplicationChekc(@Param('nickname') nickname: string) {
    const duplicationCheckDto: DuplicationCheckDto = { nickname };
    const result = await this.authService.nicknameDuplicationCheck(
      duplicationCheckDto,
    );

    if (result) {
      throw new BadRequestException('닉네임 중복');
    }
  }

  @ApiOperation({
    summary: 'sms인증 api',
    description: 'sms인증을 위해 인증번호를 보낸다.',
  })
  @ApiParam({
    name: 'phoneNumber',
    type: 'number',
    description: '인증을 진행할 전화번호',
    example: '01012345678',
    required: true,
  })
  @Get('/sms-certification/:phoneNumber')
  async smsCertification(@Param('phoneNumber') phoneNumber: number) {
    const result = await this.authService.smsCertification(phoneNumber);

    return { result };
  }
}
