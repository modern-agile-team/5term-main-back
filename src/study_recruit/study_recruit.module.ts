import { Module } from '@nestjs/common';
import { StudyRecruitController } from '@src/study_recruit/controller/study_recruit.controller';
import { StudyRecruitService } from '@src/study_recruit/service/study_recruit.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudyRecruitBoardRepository } from '@src/study_recruit/reoisitories/study_recruitment_repository';
import { StudyAdminsRepository } from '@src/study/repository/study_admins.repository';
import { S3Service } from '@src/common/s3/s3.service';
import { StudyRecruitBoardImgRepository } from '@src/study_recruit/reoisitories/study_recruitment_IMG_repository';

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
