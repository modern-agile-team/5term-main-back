import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { S3Module } from '@src/common/s3/s3.module';
import { UserRepository } from '@src/user/repositories/user.repository';
import { StudyToolsBoardsController } from './controllers/study_tools_boards.controller';
import { StudyToolsCalendarController } from './controllers/study_tools_calendar.controller';
import { StudyToolsTimetableController } from './controllers/study_tools_timetable.controller';
import { StudyRepository } from './repositories/study.repository';
import { StudyAdminsRepository } from './repositories/study_admins.repository';
import { StudyMembersRepository } from './repositories/study_members.repository';
import { StudyToolsBoardsRepository } from './repositories/study_tools_boards.repository';
import { StudyToolsBoardsImgRepository } from './repositories/study_tools_boardsIMG.repository';
import { StudyToolsCalendarsRepository } from './repositories/study_tools_calendar.repository';
import { StudyToolsTimetableRepository } from './repositories/study_tools_timetable.repository';
import { StudyService } from './services/study.service';
import { StudyToolsBoardsService } from './services/study_tools_boards.service';
import { StudyToolsCalendarService } from './services/study_tools_calendar.service';
import { StudyToolsTimetableService } from './services/study_tools_timetable.service';
import { StudyController } from './controllers/study.controller';
import { StudyRecruitController } from './controllers/study_recruit.controller';
import { StudyRecruitBoardImgRepository } from './repositories/study_recruitment_IMG_repository';
import { StudyRecruitService } from './services/study_recruit.service';
import { StudyRecruitBoardRepository } from './repositories/study_recruitment_repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      StudyToolsBoardsRepository,
      StudyToolsCalendarsRepository,
      StudyToolsTimetableRepository,
      StudyMembersRepository,
      StudyToolsBoardsImgRepository,
      StudyRepository,
      StudyAdminsRepository,
      UserRepository,
      StudyRecruitBoardImgRepository,
      StudyRecruitBoardRepository,
    ]),
    S3Module,
  ],
  controllers: [
    StudyToolsCalendarController,
    StudyToolsTimetableController,
    StudyToolsBoardsController,
    StudyController,
    StudyRecruitController,
  ],
  providers: [
    StudyToolsCalendarService,
    StudyToolsTimetableService,
    StudyToolsBoardsService,
    StudyService,
    StudyRecruitService,
  ],
})
export class StudyModule {}
