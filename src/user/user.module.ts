import { Module } from '@nestjs/common';
import { S3Module } from '@src/common/s3/s3.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LightningBoardRepository } from '@src/lightning/repositories/lightning_recruitment_boards.repository';
import { UserProfileRepository } from '@src/user/repositories/user-profile.repository';
import { UserRepository } from '@src/user/repositories/user.repository';
import { UserImageRepository } from '@src/user/repositories/user-image.repository';
import { AuthPasswordLoginRepository } from '@src/auth/repositories/auth-password-login.repository';
import { UserProfileService } from '@src/user/services/user-profile.service';
import { UserProfileController } from '@src/user/controllers/user-profile.controller';

@Module({
  imports: [
    S3Module,
    TypeOrmModule.forFeature([
      LightningBoardRepository,
      UserProfileRepository,
      UserRepository,
      UserImageRepository,
      AuthPasswordLoginRepository,
    ]),
  ],
  providers: [UserProfileService],
  controllers: [UserProfileController],
})
export class UserModule {}
