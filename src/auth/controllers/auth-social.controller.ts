import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import * as config from 'config';
import { JwtAccessGuard } from '../../config/guards/jwt-access-token.guard';
import { GetUserId } from 'src/common/decorators/getUserId.decorator';
import { SocialUserProfileDto } from '../dtos/social-user-profile.dto';
import { Response } from 'express';
import { AuthSocialService } from '../services/auth-social.service';

const jwtConfig = config.get('jwt');

@ApiTags('auth-soical')
@Controller('auth-social')
export class AuthSocialController {
  constructor(private authSocialService: AuthSocialService) {}

  @Get('/login')
  @ApiOperation({
    summary: '소셜 로그인',
    description:
      '소셜로그인 인가코드를 받아 소셜로그인을 진행하고 추가 정보 기입을 위한 토큰 발급',
  })
  async socialLogin(@Query() { code }, @Res() res: Response) {
    if (!code) {
      throw new BadRequestException('인가코드가 없음');
    }
    const { accessToken, refreshToken } =
      await this.authSocialService.socialLogin(code);
    const cookieOption = {
      httpOnly: true,
      domain: 'localhost',
      maxAge: jwtConfig.refreshExpiresIn,
    };
    res.cookie('refreshToken', refreshToken, cookieOption);

    return res.json({ accessToken });
  }

  @Post('/singup')
  @ApiOperation({
    summary: '소셜 회원가입',
    description: '소셜로 회원가입할 시 추가 정보를 위한 api',
  })
  @UseGuards(JwtAccessGuard)
  async socialSingup(
    @GetUserId() userId: number,
    @Body() socialUserProfileDto: SocialUserProfileDto,
    @Res() res: Response,
  ) {
    const { accessToken, refreshToken, profile } =
      await this.authSocialService.socialSingUp(userId, socialUserProfileDto);

    const cookieOption = {
      httpOnly: true,
      domain: 'localhost',
      maxAge: jwtConfig.refreshExpiresIn,
    };
    res.cookie('refreshToken', refreshToken, cookieOption);

    return res.json({ accessToken, profile });
  }

  @Delete('/unlink')
  @ApiOperation({
    summary: '소셜 회원탈퇴',
    description: '소셜로그인 회원들이 회원탈퇴를 위한 api',
  })
  @UseGuards(JwtAccessGuard)
  async socialUnlink(@GetUserId() userId: number) {
    return this.authSocialService.socialUnlick(userId);
  }
}
