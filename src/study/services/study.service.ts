import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudyAdminsRepository } from '@src/study/repositories/study_admins.repository';
import { UserRepository } from '@src/user/repositories/user.repository';
import { StudyRepository } from '@src/study/repositories/study.repository';
import { StudyMembersRepository } from '@src/study/repositories/study_members.repository';

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
    return await this.studyRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async getStudy(studyId) {
    const studyInfo = await this.studyRepository.getStudy(studyId);
    if (!studyInfo[0]) throw new BadRequestException('존재하지 않는 스터디');
    return studyInfo;
  }

  async getUsers(studyId) {
    const studyInfo = await this.studyRepository.find({
      where: { id: studyId },
    });
    if (!studyInfo[0]) throw new BadRequestException('존재하지 않는 스터디');

    return await this.studyMembersRepository.find({
      where: { study: studyId },
    });
  }

  async getUserStudy(userId) {
    const userInfo = await this.userRepository.getUserId({ userId: userId });
    if (userInfo === undefined)
      throw new BadRequestException('존재하지 않는 사용자');
    const memberInfo = await this.studyMembersRepository.getUserStudy(userId);

    if (!!memberInfo[0]) return memberInfo;
    else throw new NotFoundException('가입된 스터디가 없음.');
  }

  async createStudy(userId, content) {
    //스터디 생성
    try {
      const studyInfo = await this.studyRepository.createStudy(content);
      const studyId = studyInfo.identifiers[0].id;

      //스터디 생성자 관리자권한 부여
      const adminInfo = await this.studyAdminsRepository.giveAdmin(
        userId,
        studyId,
      );

      //생성된 스터디에 멤버로 참여
      const memberInfo = await this.studyMembersRepository.joinStudyForAdmin(
        userId,
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

  async deleteStudy(userId, studyId) {
    const checkAdmin = await this.studyAdminsRepository.checkAdmin(
      userId,
      studyId,
    );
    if (!checkAdmin[0]) throw new UnauthorizedException('관리자 권한 없음');
    return this.studyRepository.deleteStudy(studyId);
  }

  async joinStudy(userId, study) {
    const memberInfo = await this.studyMembersRepository.find({
      where: { study: study.studyId, user: userId },
    });
    if (!!memberInfo[0]) {
      if (memberInfo[0].isAccept === 0)
        return new BadRequestException('이미 신청한 스터디');
      if (memberInfo[0].isAccept === 1)
        return new BadRequestException('이미 가입된 스터디');
    }

    const studyInfo = await this.studyRepository.find({
      where: { id: study.studyId },
    });

    if (!studyInfo[0]) throw new BadRequestException('유효하지 않은 스터디.');
    return this.studyMembersRepository.joinStudy(userId, study.studyId);
  }

  async exitStudy(userId, studyId) {
    const studyInfo = await this.studyRepository.find({
      where: { id: studyId },
    });
    if (!studyInfo[0]) throw new BadRequestException('존재하지 않는 스터디');
    const memberInfo = await this.studyMembersRepository.find({
      where: { study: studyId, user: userId },
    });

    if (!memberInfo[0] || memberInfo[0].isAccept !== 1)
      throw new BadRequestException('멤버가 아님');

    const checkAdmin = await this.studyAdminsRepository.find({
      where: { user: userId, study: studyId },
    });
    if (!!checkAdmin[0])
      throw new BadRequestException('관리자 권한을 양도 후 탈퇴 가능');
    return await this.studyMembersRepository.exitStudy(userId, studyId);
  }

  async expelStudy(userId, req) {
    const checkAdmin = await this.studyAdminsRepository.checkAdmin(
      userId,
      req.studyId,
    );

    if (!checkAdmin[0]) throw new UnauthorizedException('관리자 권한 없음');

    const memberInfo = await this.studyMembersRepository.find({
      where: { study: req.studyId, user: req.userId },
    });

    if (!memberInfo[0] || memberInfo[0].isAccept !== 1)
      throw new BadRequestException('멤버가 아님');
    else return await this.studyMembersRepository.expelStudy(req);
  }

  async acceptStudy(userId, req) {
    const checkAdmin = await this.studyAdminsRepository.find({
      where: { user: userId, study: req.studyId },
    });
    if (!checkAdmin[0]) throw new UnauthorizedException('관리자 권한 없음');
    const result = await this.studyMembersRepository.acceptStudy(req);
    if (result.affected === 0) throw new BadRequestException('수락 요청 실패');
    else return result;
  }

  async rejectStudy(userId, req) {
    const checkAdmin = await this.studyAdminsRepository.find({
      where: { user: userId, study: req.studyId },
    });
    if (!checkAdmin[0]) throw new UnauthorizedException('관리자 권한 없음');
    const result = await this.studyMembersRepository.rejectStudy(req);
    if (result.affected === 0) throw new BadRequestException('거절 요청 실패');
    else return result;
  }

  async transferAdmin(userId, req) {
    const checkAdmin = await this.studyAdminsRepository.find({
      where: { user: userId, study: req.studyId },
    });
    const memberInfo = await this.studyMembersRepository.find({
      where: { user: req.userId, study: req.studyId },
    });
    if (!checkAdmin[0]) throw new UnauthorizedException('관리자 권한 없음');
    if (!memberInfo[0] || memberInfo[0].isAccept !== 1)
      throw new BadRequestException('멤버가 아님');

    return this.studyAdminsRepository.transferAdmin(req);
  }

  async checkAccess(userId, studyId) {
    const checkAccess = await this.studyMembersRepository.find({
      where: { user: userId, study: studyId },
    });
    if (!checkAccess[0]) throw new ForbiddenException('권한 없음');
    return true;
  }
}
