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
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('profile')
@Controller('profiles')
@UseGuards(JwtAccessGuard)
export class ProfileController {
  constructor(private profileService: ProfileService) {}
  @Get('/')
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: '프로필 가져오기',
    description: '프로필 가져오는 api',
  })
  async getUserProfile(@GetUserId() userNo) {
    return await this.profileService.getUserProfile(userNo);
  }

  @Patch('/imgs')
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: '프로필 사진 업로드',
    description: '프로필 사진 업로드하는 api',
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadProfileImg(@UploadedFile() file, @GetUserId() userNo) {
    return this.profileService.uploadProfileImg(file, userNo);
  }

  @Patch('/password')
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: '비밀번호 변경',
    description: '비밀번호 변경하는 api',
  })
  async changePassword(
    @GetUserId() userNo,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    return this.profileService.changPassword(userNo, changePasswordDto);
  }

  @Patch('/email')
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: '이메일 변경',
    description: '이메일 변경하는 api',
  })
  async changeEmail(
    @GetUserId() userNo,
    @Body() changeEmailDto: ChangeEmailDto,
  ) {
    return this.profileService.changeEmail(userNo, changeEmailDto);
  }

  @Patch('/phone')
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: '전화번호 변경',
    description: '전화번호 변경하는 api',
  })
  async changePhoneNumber(
    @GetUserId() userNo,
    @Body() changePhoneDto: ChangePhoneDto,
  ) {
    return this.profileService.changePhoneNumber(userNo, changePhoneDto);
  }

  @Patch('/bio')
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: '자기소개 변경',
    description: '자기소개 변경하는 api',
  })
  async changeBio(@GetUserId() userNo, @Body() changeBioDto: ChangeBioDto) {
    return this.profileService.changeBio(userNo, changeBioDto);
  }

  @Get('/my-posts')
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: '내가 쓴 글 가져오기',
    description: '내가 쓴 글 가져오는 api',
  })
  async getMyPosts(@GetUserId() userNo) {
    return this.profileService.getMyPosts(userNo);
  }
}
