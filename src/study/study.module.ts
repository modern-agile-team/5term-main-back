import { Module } from '@nestjs/common';
import { StudyController } from './study.controller';
import { StudyService } from './study.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudyRepository } from './study.repository';

@Module({
  imports: [TypeOrmModule.forFeature([StudyRepository])],
  controllers: [StudyController],
  providers: [StudyService],
})
export class StudyModule {}
