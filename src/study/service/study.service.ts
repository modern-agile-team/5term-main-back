import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudyRepository } from '../repository/study.repository';
import { StudyMembersRepository } from '../repository/study_members.repository';
import { StudyAdminsRepository } from '../repository/study_admins.repository';
import { UserRepository } from 'src/user/repositories/user.repository';

@Injectable()
export class StudyService {
  constructor(
    @InjectRepository(StudyRepository)
    private studyRepository: StudyRepository,
    @InjectRepository(StudyAdminsRepository)
    private studyAdminsRepository: StudyAdminsRepository,
    @InjectRepository(StudyMembersRepository)
    private studyMembersRepository: StudyMembersRepository,
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async createStudy(user, body) {
    //스터디 생성
    const studyInfo = await this.studyRepository
      .createQueryBuilder()
      .insert()
      .values([{ end_date: body.endDate, active: body.active }])
      .execute();
    const studyId = studyInfo.identifiers[0].id;
    const userInfo = await this.userRepository
      .createQueryBuilder('user')
      .select(['user.id'])
      .where('user.id = :userId', { userId: user.userId })
      .getOne();

    //스터디 생성자 관리자권한 부여
    const adminInfo = await this.studyAdminsRepository
      .createQueryBuilder()
      .insert()
      .values([{ study: studyId, user: userInfo }])
      .execute();

    //생성된 스터디에 멤버로 참여
    const memberInfo = await this.studyMembersRepository
      .createQueryBuilder()
      .insert()
      .values([{ study: studyId, user: userInfo }])
      .execute();
    return { studyInfo, adminInfo, memberInfo };
  }

  // async joinStudy() {}
}