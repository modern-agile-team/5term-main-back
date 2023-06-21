import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
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

  async getStudyList() {
    return await this.studyRepository.find();
  }

  async getStudy(studyId) {
    const studyInfo = await this.studyRepository.getStudy(studyId);
    if (!!studyInfo[0] === false)
      throw new BadRequestException('존재하지 않는 스터디');
    return studyInfo;
  }

  async getUsers(studyId) {
    const studyInfo = await this.studyMembersRepository.find({
      where: { study: studyId },
    });
    if (!!studyInfo[0] === false)
      throw new BadRequestException('존재하지 않는 스터디');
    return studyInfo;
  }

  async getUserStudy(userId) {
    const userInfo = await this.userRepository.getUserId({ userId: userId });
    if (userInfo === undefined)
      throw new BadRequestException('존재하지 않는 사용자');
    const memberInfo = await this.studyMembersRepository.getUserStudy(userId);

    if (!!memberInfo[0]) return memberInfo;
    else throw new NotFoundException('가입된 스터디가 없음.');
  }

  async createStudy(user, content) {
    //스터디 생성
    try {
      const studyInfo = await this.studyRepository.createStudy(content);
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

      return {
        msg: '스터디 생성 성공',
        studyInfo: studyInfo.identifiers,
        adminInfo: adminInfo.identifiers,
        memberInfo: memberInfo.identifiers,
      };
    } catch {
      throw new BadRequestException('스터디 생성 실패');
    }
  }

  async deleteStudy(user, study) {
    const checkAdmin = await this.studyAdminsRepository.find({
      where: { user: user.userId, study: study.studyId },
    });
    return !!checkAdmin[0]
      ? this.studyRepository.deleteStudy(study.studyId)
      : new UnauthorizedException('관리자 권한 없음');
  }

  async joinStudy(user, study) {
    const studyInfo = await this.studyRepository.find({
      where: { id: study.studyId },
    });
    return !!studyInfo[0]
      ? this.studyMembersRepository.joinStudy(user.userId, study.studyId)
      : new BadRequestException('유효하지 않은 스터디.');
  }

  async exitStudy(user, study) {
    const studyInfo = await this.studyRepository.find({
      where: { id: study.studyId },
    });
    if (!studyInfo[0]) throw new BadRequestException('존재하지 않는 스터디');
    const memberInfo = await this.studyMembersRepository.find({
      where: { studyInfo: study.studyId, user: user.userId },
    });
    if (!memberInfo[0]) throw new BadRequestException('멤버가 아님');

    return await this.studyMembersRepository.exitStudy(
      user.userId,
      study.studyId,
    );
  }
  async acceptStudy(user, req) {
    const checkAdmin = await this.studyAdminsRepository.find({
      where: { user: user.userId, study: req.studyId },
    });
    return !!checkAdmin[0]
      ? this.studyMembersRepository.acceptStudy(user, req.studyId)
      : new UnauthorizedException('관리자 권한 없음');
  }

  async rejectStudy(user, req) {
    const checkAdmin = await this.studyAdminsRepository.find({
      where: { user: user.userId, study: req.studyId },
    });
    return !!checkAdmin[0]
      ? this.studyMembersRepository.rejectStudy(user, req.studyId)
      : new UnauthorizedException('관리자 권한 없음');
  }

  async transferAdmin(user, req) {
    const checkAdmin = await this.studyAdminsRepository.find({
      where: { user: user.userId, study: req.studyId },
    });
    return !!checkAdmin[0]
      ? this.studyAdminsRepository.transferAdmin(user, req.studyId)
      : new UnauthorizedException('관리자 권한 없음');
  }
}
