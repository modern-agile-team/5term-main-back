import { Module } from '@nestjs/common';
import { StudyController } from '@src/study/controller/study.controller';
import { StudyService } from '@src/study/service/study.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudyRepository } from '@src/study/repository/study.repository';
import { StudyAdminsRepository } from '@src/study/repository/study_admins.repository';
import { StudyMembersRepository } from '@src/study/repository/study_members.repository';
import { UserRepository } from '@src/user/repositories/user.repository';

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
