import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudyAdminsRepository } from '@src/study/repositories/study_admins.repository';
import { StudyRecruitBoardImgRepository } from '@src/study/repositories/study_recruitment_IMG_repository';
import { StudyRecruitBoardRepository } from '@src/study/repositories/study_recruitment_repository';

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
      ...createStudyBoardDto,
      writer: userId,
    };
    const checkAdmin = await this.studyAdminsRepository.checkAdmin(
      userId,
      req.studyId,
    );
    if (!checkAdmin[0]) throw new ForbiddenException('관리자 권한 없음');

    const result = await this.studyRecruitRepository.createStudyRecruitBoard(
      req,
    );
    return result.identifiers;
  }

  async uploadImg(url, boardId) {
    console.log(url);
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
    if (!boardInfo) {
      throw new BadRequestException('존재하지 않는 게시글');
    }
    return boardInfo;
  }

  async getStudyRecruitBoardList() {
    return await this.studyRecruitRepository.find({
      order: { createdAt: 'DESC' },

      select: ['id', 'title'],
    });
  }

  async updateStudyRecruitBoard(userId, updateStudyBoardDto) {
    const boardInfo = await this.studyRecruitRepository.getStudyRecruitBoard(
      updateStudyBoardDto.boardId,
    );
    if (!boardInfo) {
      throw new BadRequestException('존재하지 않는 게시글');
    }
    if (boardInfo.writer.id !== userId)
      throw new ForbiddenException('관리자 권한 없음');
    return await this.studyRecruitRepository.updateStudyRecruitBoard(
      updateStudyBoardDto,
    );
  }

  async deleteStudyRecruitBoard(userId, boardId) {
    const boardInfo = await this.studyRecruitRepository.getStudyRecruitBoard(
      boardId,
    );
    if (!boardInfo) {
      throw new BadRequestException('존재하지 않는 게시글');
    }
    if (boardInfo.writer.id !== userId)
      throw new ForbiddenException('관리자 권한 없음');
    return await this.studyRecruitRepository.deleteStudyRecruitBoard(boardId);
  }
}
