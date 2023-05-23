import {
  Body,
  Controller,
  Post,
  HttpCode,
  BadRequestException,
  Get,
  Param,
  Req,
  UseGuards,
  UnauthorizedException,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import {
  IdDuplicationCheckDto,
  NicknameDuplicationCheckDto,
  PhoneDuplicationCheckDto,
} from './dto/duplicationCheck.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('auth')
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
  @HttpCode(200)
  async idDuplicationChekc(@Param() id: IdDuplicationCheckDto) {
    const result = await this.authService.idDuplicationCheck(id);

    if (result) {
      throw new BadRequestException('아이디 중복');
    }

    return { msg: '아이디 중복 없음' };
  }

  @Get('/nickname-duplication-ckecking/:nickname')
  @ApiOperation({
    summary: '닉네임 중복체크',
    description: '닉네임 중복체크한다.',
  })
  @HttpCode(200)
  async nicknameDuplicationChekc(
    @Param() nickname: NicknameDuplicationCheckDto,
  ) {
    const result = await this.authService.nicknameDuplicationCheck(nickname);

    if (result) {
      throw new BadRequestException('닉네임 중복');
    }

    return { mag: '닉네임 중복 없음' };
  }

  @ApiOperation({
    summary: 'sms인증 api',
    description: 'sms인증을 위해 인증번호를 보낸다.',
  })
  @Get('/sms-certification/:phoneNumber')
  async smsCertification(@Param() phoneNumber: PhoneDuplicationCheckDto) {
    const result = await this.authService.smsCertification(phoneNumber);

    return { certificationNumber: result };
  }

  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }

  @Get('/get-access-token')
  @ApiBearerAuth('refresh-token')
  @UseGuards(AuthGuard())
  async recreatAccessToken(@Req() req) {
    const payload = req.user;

    if (payload.type !== 'REFRESH') {
      throw new UnauthorizedException();
    }

    return await this.authService.recreateToken(payload.userId);
  }

  @Delete('/logout')
  @ApiBearerAuth('refresh-token')
  @UseGuards(AuthGuard())
  async logout(@Req() req) {
    await this.authService.logout(req.user.userId);

    return { msg: '로그아웃 완료' };
  }
}
