import {
  Body,
  Controller,
  Post,
  HttpCode,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { DuplicationCheckDto } from './dto/duplicationCheck.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

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
}
