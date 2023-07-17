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

@Module({
  imports: [
    TypeOrmModule.forFeature([
      StudyToolsBoardsRepository,
      StudyToolsCalendarsRepository,
      StudyToolsTimetableRepository,
      StudyMembersRepository,
      StudyToolsBoardsImgRepository,
    ]),
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
    S3Service,
  ],
})
export class StudyToolsModule {}
