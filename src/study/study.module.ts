import { Module } from '@nestjs/common';
import { StudyController } from './controller/study.controller';
import { StudyService } from './service/study.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudyRepository } from './repository/study.repository';
import { StudyAdminsRepository } from './repository/study_admins.repository';
import { StudyMembersRepository } from './repository/study_members.repository';
import { UserRepository } from 'src/user/repositories/user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      StudyRepository,
      StudyAdminsRepository,
      StudyMembersRepository,
      UserRepository,
    ]),
  ],
  controllers: [StudyController],
  providers: [StudyService],
})
export class StudyModule {}
