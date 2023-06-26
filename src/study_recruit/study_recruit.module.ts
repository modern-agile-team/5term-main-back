import { Module } from '@nestjs/common';
import { StudyRecruitController } from './controller/study_recruit.controller';
import { StudyRecruitService } from './controller/service/study_recruit.service';

@Module({
  controllers: [StudyRecruitController],
  providers: [StudyRecruitService],
})
export class StudyRecruitModule {}
