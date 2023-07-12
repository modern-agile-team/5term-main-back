import { Module } from '@nestjs/common';
import { StudyToolsService } from './services/study_tools.service';
import { StudyToolsController } from './controllers/study_tools.controller';
import { StudyToolsBoardsController } from './controllers/study_tools_boards.controller';
import { StudyToolsBoardsService } from './services/study_tools_boards.service';

@Module({
  controllers: [StudyToolsController, StudyToolsBoardsController],
  providers: [StudyToolsService, StudyToolsBoardsService],
})
export class StudyToolsModule {}
