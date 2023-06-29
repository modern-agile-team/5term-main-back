import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudyRecruitBoardRepository } from '../reoisitories/study_recruitment_repository';
import { CreateStudyBoardDto } from '../dto/create-study-board-dto';
import { StudyAdminsRepository } from 'src/study/repository/study_admins.repository';

@Injectable()
export class StudyRecruitService {
  constructor(
    @InjectRepository(StudyRecruitBoardRepository)
    private studyRecruitRepository: StudyRecruitBoardRepository,
    @InjectRepository(StudyAdminsRepository)
    private studyAdminsRepository: StudyAdminsRepository,
  ) {}

  async createStudyRecruitBoard(
    userId,
    createStudyBoardDto: CreateStudyBoardDto,
  ) {
    const req = {
      writer: userId,
      title: createStudyBoardDto.title,
      study: createStudyBoardDto.studyId,
      contents: createStudyBoardDto.contents,
    };
    const checkAdmin = await this.studyAdminsRepository.find({
      where: { user: userId, study: req.study },
    });
    if (!!checkAdmin[0] === false)
      throw new UnauthorizedException('관리자 권한 없음');

    const result = this.studyRecruitRepository.createStudyRecruitBoard(req);
    return (await result).identifiers;
  }

  async getStudyRecruitBoard(boardId) {
    const boardInfo = await this.studyRecruitRepository.getStudyRecruitBoard(
      boardId,
    );
    if (!!boardInfo === false)
      throw new BadRequestException('존재하지 않는 게시글');
    return boardInfo;
  }

  async getStudyRecruitBoardList() {
    return await this.studyRecruitRepository.find({
      select: ['id', 'title'],
    });
  }

  async updateStudyRecruitBoard(userId, updateStudyBoardDto) {
    const checkAccess = await this.studyRecruitRepository.getWriter(
      updateStudyBoardDto,
    );
    if (checkAccess.writer.id !== userId) {
      throw new UnauthorizedException('수정 권한 없음');
    }
    return await this.studyRecruitRepository.updateStudyRecruitBoard(
      updateStudyBoardDto,
    );
  }
}
