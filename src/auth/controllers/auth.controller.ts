import {
  Body,
  Controller,
  Post,
  HttpCode,
  BadRequestException,
  Get,
  Param,
  UseGuards,
  Delete,
  ParseIntPipe,
  Res,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthCredentialDto } from '../dtos/auth-credential.dto';
import {
  IdDuplicationCheckDto,
  NicknameDuplicationCheckDto,
} from '../dtos/duplicationCheck.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginDto } from '../dtos/login.dto';
import { Response } from 'express';
import { JwtRefreshGuard } from '../guards/jwt-refresh-token.guard';
import { GetUserId } from 'src/common/decorator/getUserId.decorator';
import { JwtAccessGuard } from '../guards/jwt-access-token.guard';
import * as config from 'config';
import { GetPayload } from 'src/common/decorator/getPayload.decorator';
import { GetLoginType } from 'src/common/decorator/getLoginType.decorator';
import { AuthSocialService } from '../services/auth-social.service';

const jwtConfig = config.get('jwt');

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private authSocialService: AuthSocialService,
  ) {}
  @Post('/signup')
  @ApiOperation({ summary: '회원가입', description: '회원가입' })
  @ApiBody({ type: AuthCredentialDto })
  @HttpCode(200)
  singUp(@Body() authCredentialDto: AuthCredentialDto) {
    return this.authService.singUp(authCredentialDto);
  }

  @Get('/id-duplication-ckecking/:id')
  @ApiOperation({ summary: 'id중복체크', description: 'id를 중복체크한다.' })
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
  async smsCertification(
    @Param('phoneNumber', ParseIntPipe) phoneNumber: number,
  ) {
    const result = await this.authService.smsCertification(phoneNumber);

    return { certificationNumber: result };
  }

  @ApiOperation({
    summary: '로그인',
    description: '로그인을 하면 access과 refresh토큰을 같이 발급해 준다.',
  })
  @Post('/login')
  @HttpCode(200)
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    const { accessToken, refreshToken } = await this.authService.login(
      loginDto,
    );

    const cookieOption = {
      httpOnly: true,
      domain: 'localhost',
      maxAge: jwtConfig.refreshExpiresIn,
    };
    res.cookie('refreshToken', refreshToken, cookieOption);

    return res.json({ accessToken });
  }

  @Get('/access-token')
  @ApiOperation({
    summary: 'Access Token 재발급',
    description: 'Access Token 재발급한다.',
  })
  @UseGuards(JwtRefreshGuard)
  async recreatAccessToken(@GetUserId() userId) {
    const accessToken = await this.authService.recreateToken(userId);
    return { accessToken };
  }

  @Delete('/logout')
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: '로그아웃',
    description: '로그아웃',
  })
  @UseGuards(JwtAccessGuard)
  async logout(@GetUserId() userId, @GetLoginType() loginType) {
    if (loginType) {
      await this.authService.logout(userId);
    } else {
      await this.authSocialService.socialLogout(userId);
    }
    return { msg: '로그아웃 완료' };
  }

  @Get('/access-token-validation')
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAccessGuard)
  @ApiOperation({
    summary: 'AccessToken 유효성 검사',
    description: 'AccessToken의 유효 기간이 10분 밑이면 401',
  })
  async accessTokenValidation(@GetPayload() payload) {
    const expirationPeriod = payload.exp;
    return this.authService.accessTokenValidation(expirationPeriod);
  }
}
