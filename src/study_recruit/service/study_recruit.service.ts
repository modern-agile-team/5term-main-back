import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudyRecruitBoardRepository } from '../reoisitories/study_recruitment_repository';
import { StudyAdminsRepository } from 'src/study/repository/study_admins.repository';
import { StudyRecruitBoardImgRepository } from '../reoisitories/study_recruitment_IMG_repository';

@Injectable()
export class StudyRecruitService {
  constructor(
    @InjectRepository(StudyRecruitBoardRepository)
    private studyRecruitRepository: StudyRecruitBoardRepository,
    @InjectRepository(StudyAdminsRepository)
    private studyAdminsRepository: StudyAdminsRepository,
    @InjectRepository(StudyRecruitBoardImgRepository)
    private studyRecruitBoardImgRepository: StudyRecruitBoardImgRepository,
  ) {}

  async createStudyRecruitBoard(userId, createStudyBoardDto) {
    const req = {
      writer: userId,
      title: createStudyBoardDto.title,
      study: Number(createStudyBoardDto.studyId),
      contents: createStudyBoardDto.contents,
    };
    const checkAdmin = await this.studyAdminsRepository.find({
      where: { user: userId, study: req.study },
    });
    if (!!checkAdmin[0] === false)
      throw new UnauthorizedException('관리자 권한 없음');

    const result = await this.studyRecruitRepository.createStudyRecruitBoard(
      req,
    );
    return result.identifiers;
  }

  async uploadImg(url, boardId) {
    return await this.studyRecruitBoardImgRepository.uploadImg(url, boardId);
  }

  async deleteImg(boardId) {
    return await this.studyRecruitBoardImgRepository.deleteImg(boardId);
  }

  async getImg(boardId) {
    return await this.studyRecruitBoardImgRepository.find({
      where: { studyRecruitBoardId: boardId },
    });
  }

  async getStudyRecruitBoard(boardId) {
    const boardInfo = await this.studyRecruitRepository.getStudyRecruitBoard(
      boardId,
    );
    if (!!boardInfo === false) {
      throw new BadRequestException('존재하지 않는 게시글');
    }
    return boardInfo;
  }

  async getStudyRecruitBoardList() {
    return await this.studyRecruitRepository.find({
      select: ['id', 'title'],
    });
  }

  async updateStudyRecruitBoard(userId, updateStudyBoardDto) {
    const checkAccess = await this.studyRecruitRepository.getWriter(
      updateStudyBoardDto.boardId,
    );
    if (checkAccess.writer.id !== userId) {
      throw new UnauthorizedException('수정 권한 없음');
    }
    return await this.studyRecruitRepository.updateStudyRecruitBoard(
      updateStudyBoardDto,
    );
  }

  async deleteStudyRecruitBoard(userId, boardId) {
    const checkAccess = await this.studyRecruitRepository.getWriter(boardId);
    if (checkAccess.writer.id !== userId) {
      throw new UnauthorizedException('수정 권한 없음');
    }
    return await this.studyRecruitRepository.deleteStudyRecruitBoard(boardId);
  }
}
