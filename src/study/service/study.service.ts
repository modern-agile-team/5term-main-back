import { ForbiddenException, Injectable } from '@nestjs/common';
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

  async getStudies(userId) {
    const studyInfo = await this.studyMembersRepository.getStudies(userId);
    const studyId = studyInfo.map((study) => {
      return study.StudyToUserEntity_id;
    });
    return studyId;
  }

  async getStudyInfo(studyId) {
    const studyInfo = await this.studyRepository.getStudyInfo(studyId);
    const memberInfo = await this.studyMembersRepository.getMembers(studyId);
    return [studyInfo, memberInfo];
  }

  async createStudy(user, body) {
    //스터디 생성
    const studyInfo = await this.studyRepository.createStudy(body);

    const studyId = studyInfo.identifiers[0].id;

    //스터디 생성자 관리자권한 부여
    const adminInfo = await this.studyAdminsRepository.giveAdmin(
      user.userId,
      studyId,
    );

    //생성된 스터디에 멤버로 참여
    const memberInfo = await this.studyMembersRepository.joinStudyForAdmin(
      user.userId,
      studyId,
    );

    return { studyInfo, adminInfo, memberInfo };
  }

  async deleteStudy(user, body) {
    const adminInfo = await this.studyAdminsRepository.checkAdmin(
      user.userId,
      body.studyId,
    );
    if (adminInfo.success === true) {
      return await this.studyRepository.deleteStudy(body.studyId);
    }
  }

  async joinStudy(user, body) {
    const memberInfo = await this.studyMembersRepository.joinStudy(
      user.userId,
      body.studyId,
    );
    return memberInfo;
  }

  async exitStudy(user, body) {
    const memberInfo = await this.studyMembersRepository.exitStudy(
      user.userId,
      body.studyId,
    );
    return memberInfo;
  }
  async acceptStudy(user, body) {
    const isAdmin = await this.studyAdminsRepository.checkAdmin(
      user.userId,
      body.studyId,
    );

    if (isAdmin.success === false) throw new ForbiddenException('권한 없음');

    const memberInfo = await this.studyMembersRepository.acceptStudy(
      user.userId,
      body,
    );
    return memberInfo;
  }

  async rejectStudy(user, body) {
    const isAdmin = await this.studyAdminsRepository.checkAdmin(
      user.userId,
      body.studyId,
    );

    if (isAdmin.success === false) throw new ForbiddenException('권한 없음');

    const memberInfo = await this.studyMembersRepository.rejectStudy(
      user.userId,
      body,
    );
    return memberInfo;
  }

  async transferAdmin(user, body) {
    const isAdmin = await this.studyAdminsRepository.checkAdmin(
      user.userId,
      body.studyId,
    );

    if (isAdmin.success === false) throw new ForbiddenException('권한 없음');

    const memberInfo = await this.studyAdminsRepository.transferAdmin(
      body.userId,
      body.studyId,
    );
    return memberInfo;
  }
}
