import {
  Body,
  Controller,
  Get,
  Patch,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAccessGuard } from 'src/auth/guard/jwt-access-token.guard';
import { GetUserId } from 'src/common/decorator/getUserId.decorator';
import { ProfileService } from './profile.service';
import { ChangePasswordDto } from 'src/auth/dto/changePassword.dto';
import { ChangeEmailDto } from './dto/changeEmail.dto';
import { ChangePhoneDto } from './dto/changePhone.dto';
import { ChangeBioDto } from './dto/changeBio.dto';

@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}
  @Patch('/imgs')
  @UseGuards(JwtAccessGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadProfileImg(@UploadedFile() file, @GetUserId() userNo) {
    return this.profileService.uploadProfileImg(file, userNo);
  }

  @Get('/')
  @UseGuards(JwtAccessGuard)
  async getUserProfile(@GetUserId() userNo) {
    return await this.profileService.getUserProfile(userNo);
  }

  @Patch('/password')
  @UseGuards(JwtAccessGuard)
  async changePassword(
    @GetUserId() userNo,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    return this.profileService.changPassword(userNo, changePasswordDto);
  }

  @Patch('/email')
  @UseGuards(JwtAccessGuard)
  async changeEmail(
    @GetUserId() userNo,
    @Body() changeEmailDto: ChangeEmailDto,
  ) {
    return this.profileService.changeEmail(userNo, changeEmailDto);
  }

  @Patch('/phone')
  @UseGuards(JwtAccessGuard)
  async changePhoneNumber(
    @GetUserId() userNo,
    @Body() changePhoneDto: ChangePhoneDto,
  ) {
    return this.profileService.changePhoneNumber(userNo, changePhoneDto);
  }

  @Patch('/bio')
  @UseGuards(JwtAccessGuard)
  async changeBio(@GetUserId() userNo, @Body() changeBioDto: ChangeBioDto) {
    return this.profileService.changeBio(userNo, changeBioDto);
  }

  @Get('/my-posts')
  @UseGuards(JwtAccessGuard)
  async getMyPosts(@GetUserId() userNo) {
    return this.profileService.getMyPosts(userNo);
  }
}
