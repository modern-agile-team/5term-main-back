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
import { ApiTags } from '@nestjs/swagger';
import * as config from 'config';
import { JwtAccessGuard } from '../guards/jwt-access-token.guard';
import { GetUserId } from 'src/common/decorator/getUserId.decorator';
import { SocialUserProfileDto } from '../dtos/socialUserProfile.dto';
import { Response } from 'express';
import { AuthSocialService } from '../services/auth-social.service';

const jwtConfig = config.get('jwt');

@ApiTags('auth-soical')
@Controller('auth-social')
export class AuthSocialController {
  constructor(private authSocialService: AuthSocialService) {}

  @Get('/login')
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

  @Delete('/logout')
  @UseGuards(JwtAccessGuard)
  async socialLogout(@GetUserId() userid: number) {
    return this.authSocialService.socialLogout(userid);
  }

  @Delete('/unlink')
  @UseGuards(JwtAccessGuard)
  async socialUnlink(@GetUserId() userId: number) {
    return this.authSocialService.socialUnlick(userId);
  }
}
