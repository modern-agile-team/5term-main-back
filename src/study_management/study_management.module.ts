import { Module } from '@nestjs/common';
import { StudyManagementController } from './study_management.controller';
import { StudyManagementService } from './study_management.service';

@Module({
  controllers: [StudyManagementController],
  providers: [StudyManagementService]
})
export class StudyManagementModule {}
