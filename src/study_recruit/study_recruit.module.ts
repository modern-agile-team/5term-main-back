import { Module } from '@nestjs/common';
import { StudyRecruitController } from './controller/study_recruit.controller';
import { StudyRecruitService } from './service/study_recruit.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudyRecruitBoardRepository } from './reoisitories/study_recruitment_repository';
import { StudyAdminsRepository } from 'src/study/repository/study_admins.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      StudyRecruitBoardRepository,
      StudyAdminsRepository,
    ]),
  ],
  controllers: [StudyRecruitController],
  providers: [StudyRecruitService],
})
export class StudyRecruitModule {}
