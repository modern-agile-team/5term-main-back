import { Module } from '@nestjs/common';
import { StudyController } from './study.controller';
import { StudyService } from './study.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudyRepository } from './repository/study.repository';
import { StudyAdminsRepository } from './repository/study_admins.repository';
import { StudyMembersRepository } from './repository/study_members.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      StudyRepository,
      StudyAdminsRepository,
      StudyMembersRepository,
    ]),
  ],
  controllers: [StudyController],
  providers: [StudyService],
})
export class StudyModule {}
