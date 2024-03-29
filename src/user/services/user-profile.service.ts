import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { S3Service } from '@src/common/s3/s3.service';
import { InjectRepository } from '@nestjs/typeorm';
import { UserProfileRepository } from '@src/user/repositories/user-profile.repository';
import { UserRepository } from '@src/user/repositories/user.repository';
import { UserImageRepository } from '@src/user/repositories/user-image.repository';
import { ChangePasswordDto } from '@src/auth/dtos/change-password.dto';
import { AuthPasswordLoginRepository } from '@src/auth/repositories/auth-password-login.repository';
import { ChangeEmailDto } from '@src/user/dtos/change-email.dto';
import { ChangePhoneDto } from '@src/user/dtos/change-phone.dto';
import { ChangeBioDto } from '@src/user/dtos/change-bio.dto';
import { LightningBoardRepository } from '@src/lightning/repositories/lightning_recruitment_boards.repository';

@Injectable()
export class UserProfileService {
  constructor(
    private s3Service: S3Service,
    @InjectRepository(UserProfileRepository)
    private userProfileRepository: UserProfileRepository,
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    @InjectRepository(UserImageRepository)
    private userImageRepository: UserImageRepository,
    @InjectRepository(AuthPasswordLoginRepository)
    private authPasswordLoginRepository: AuthPasswordLoginRepository,
    @InjectRepository(LightningBoardRepository)
    private lightningBoardRepository: LightningBoardRepository,
  ) {}

  async uploadProfileImg(file, userNo) {
    const imgUrl = await this.s3Service.s3Upload(file, userNo);

    if (!imgUrl) {
      throw new InternalServerErrorException('s3업로드 실패');
    }

    const updateResult = await this.userImageRepository.updateUserImg(
      imgUrl,
      userNo,
    );

    delete updateResult.id;

    return { userId: userNo, ...updateResult };
  }

  async getUserProfile(userNo: number) {
    return await this.userProfileRepository.getUserProfile(userNo);
  }

  async changPassword(userNo: number, changePasswordDto: ChangePasswordDto) {
    return this.authPasswordLoginRepository.changePassword(
      userNo,
      changePasswordDto,
    );
  }

  async changeEmail(userNo: number, changeEmailDto: ChangeEmailDto) {
    const { email } = changeEmailDto;

    return await this.userProfileRepository.changeEmail(email, userNo);
  }

  async changePhoneNumber(userNo: number, changePhoneDto: ChangePhoneDto) {
    const { phone } = changePhoneDto;

    return await this.userProfileRepository.changePhoneNumber(phone, userNo);
  }

  async changeBio(userNo: number, changeBioDto: ChangeBioDto) {
    const { bio } = changeBioDto;

    return await this.userProfileRepository.changeBio(bio, userNo);
  }

  async getMyPosts(userNo: number) {
    const lightningrecruitmentBoards =
      await this.lightningBoardRepository.getAllLightingRecruitmentBoardsByUserNo(
        userNo,
      );

    const studyRecruitmentBoards = [];

    return { lightningrecruitmentBoards, studyRecruitmentBoards };
  }
}
