import { Module } from '@nestjs/common';
import { StudyRecruitController } from './controller/study_recruit.controller';
import { StudyRecruitService } from './service/study_recruit.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudyRecruitBoardRepository } from './reoisitories/study_recruitment_repository';
import { StudyAdminsRepository } from 'src/study/repository/study_admins.repository';
import { S3Service } from 'src/s3/s3.service';
import { StudyRecruitBoardImgRepository } from './reoisitories/study_recruitment_IMG_repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      StudyRecruitBoardRepository,
      StudyAdminsRepository,
      StudyRecruitBoardImgRepository,
    ]),
  ],
  controllers: [StudyRecruitController],
  providers: [StudyRecruitService, S3Service],
})
export class StudyRecruitModule {}
