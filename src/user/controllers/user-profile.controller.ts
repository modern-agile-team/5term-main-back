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
import { JwtAccessGuard } from '@src/config/guards/jwt-access-token.guard';
import { GetUserId } from '@src/common/decorators/get-userId.decorator';
import { UserProfileService } from '@src/user/services/user-profile.service';
import { ChangeEmailDto } from '@src/user/dtos/change-email.dto';
import { ChangePhoneDto } from '@src/user/dtos/change-phone.dto';
import { ChangeBioDto } from '@src/user/dtos/change-bio.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('profile')
@Controller('profiles')
@UseGuards(JwtAccessGuard)
export class UserProfileController {
  constructor(private profileService: UserProfileService) {}
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: '프로필 가져오기',
    description: '프로필 가져오는 api',
  })
  @Get('/')
  async getUserProfile(@GetUserId() userNo) {
    return await this.profileService.getUserProfile(userNo);
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: '프로필 사진 업로드',
    description: '프로필 사진 업로드하는 api',
  })
  @UseInterceptors(FileInterceptor('file'))
  @Patch('/imgs')
  async uploadProfileImg(@UploadedFile() file, @GetUserId() userNo) {
    return this.profileService.uploadProfileImg(file, userNo);
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: '이메일 변경',
    description: '이메일 변경하는 api',
  })
  @Patch('/email')
  async changeEmail(
    @GetUserId() userNo,
    @Body() changeEmailDto: ChangeEmailDto,
  ) {
    return this.profileService.changeEmail(userNo, changeEmailDto);
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: '전화번호 변경',
    description: '전화번호 변경하는 api',
  })
  @Patch('/phone')
  async changePhoneNumber(
    @GetUserId() userNo,
    @Body() changePhoneDto: ChangePhoneDto,
  ) {
    return this.profileService.changePhoneNumber(userNo, changePhoneDto);
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: '자기소개 변경',
    description: '자기소개 변경하는 api',
  })
  @Patch('/bio')
  async changeBio(@GetUserId() userNo, @Body() changeBioDto: ChangeBioDto) {
    return this.profileService.changeBio(userNo, changeBioDto);
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: '내가 쓴 글 가져오기',
    description: '내가 쓴 글 가져오는 api',
  })
  @Get('/my-posts')
  async getMyPosts(@GetUserId() userNo) {
    return this.profileService.getMyPosts(userNo);
  }
}
