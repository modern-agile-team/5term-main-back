import { Module } from '@nestjs/common';
import { StudyToolsCalendarService } from './services/study_tools_calendar.service';
import { StudyToolsBoardsController } from './controllers/study_tools_boards.controller';
import { StudyToolsBoardsService } from './services/study_tools_boards.service';
import { S3Service } from 'src/s3/s3.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudyToolsBoardsRepository } from './repositories/study_tools_boards.repository';
import { StudyToolsCalendarsRepository } from './repositories/study_tools_calendar.repository';
import { StudyToolsTimetableRepository } from './repositories/study_tools_timetable.repository';
import { StudyMembersRepository } from 'src/study/repository/study_members.repository';
import { StudyToolsBoardsImgRepository } from './repositories/study_tools_boardsIMG.repository';
import { StudyToolsCalendarController } from './controllers/study_tools_calendar.controller';
import { StudyToolsTimetableController } from './controllers/study_tools_timetable.controller';
import { StudyToolsTimetableService } from './services/study_tools_timetable.service';
import { StudyService } from 'src/study/service/study.service';
import { StudyRepository } from 'src/study/repository/study.repository';
import { StudyAdminsRepository } from 'src/study/repository/study_admins.repository';
import { UserRepository } from 'src/user/repositories/user.repository';
import { S3Module } from 'src/s3/s3.module';

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
    ]),
    S3Module,
  ],
  controllers: [
    StudyToolsCalendarController,
    StudyToolsTimetableController,
    StudyToolsBoardsController,
  ],
  providers: [
    StudyToolsCalendarService,
    StudyToolsTimetableService,
    StudyToolsBoardsService,
    StudyService,
  ],
})
export class StudyToolsModule {}
