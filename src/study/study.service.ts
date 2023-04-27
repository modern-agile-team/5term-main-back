import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudyRepository } from './repository/study.repository';
import { StudyMembersRepository } from './repository/study_members.repository';
import { StudyAdminsRepository } from './repository/study_admins.repository';
@Injectable()
export class StudyService {
  constructor(
    @InjectRepository(StudyRepository)
    private studyRepository: StudyRepository,
    @InjectRepository(StudyAdminsRepository)
    private studyAdminsRepository: StudyAdminsRepository,
    @InjectRepository(StudyMembersRepository)
    private studyMembersRepository: StudyMembersRepository,
  ) {}
  async createStudy(user, body) {
    this.studyRepository.insert(body);
    this.studyAdminsRepository.insert(user);
    this.studyMembersRepository.insert(user);
    return { success: true };
  }
}
