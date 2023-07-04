import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { S3Module } from 'src/s3/s3.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LightningBoardRepository } from 'src/lightning/repositories/lightning_recruitment_boards.repository';
import { UserProfileRepository } from 'src/user/repositories/userProfile.repository';
import { UserRepository } from 'src/user/repositories/user.repository';
import { UserImageRepository } from 'src/user/repositories/userImage.repository';
import { AuthPasswordLoginRepository } from 'src/auth/repositories/authPasswordLogin.repository';

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
  providers: [ProfileService],
  controllers: [ProfileController],
})
export class ProfileModule {}
