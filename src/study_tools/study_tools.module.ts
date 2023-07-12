import { Module } from '@nestjs/common';
import { StudyToolsService } from './services/study_tools.service';
import { StudyToolsController } from './controllers/study_tools.controller';
import { StudyToolsBoardsController } from './controllers/study_tools_boards.controller';
import { StudyToolsBoardsService } from './services/study_tools_boards.service';
import { S3Service } from 'src/s3/s3.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudyToolsBoardsRepository } from './repositories/study_tools_boards.repository';
import { StudyCalendarsRepository } from './repositories/study_tools_calendar.repository';
import { StudyTimetableRepository } from './repositories/study_tools_timetable.repository';
import { StudyMembersRepository } from 'src/study/repository/study_members.repository';
import { StudyToolsBoardsImgRepository } from './repositories/study_tools_boardsIMG.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      StudyToolsBoardsRepository,
      StudyCalendarsRepository,
      StudyTimetableRepository,
      StudyMembersRepository,
      StudyToolsBoardsImgRepository,
    ]),
  ],
  controllers: [StudyToolsController, StudyToolsBoardsController],
  providers: [StudyToolsService, StudyToolsBoardsService, S3Service],
})
export class StudyToolsModule {}
