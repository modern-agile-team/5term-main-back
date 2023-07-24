import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudyToolsBoardsRepository } from '../repositories/study_tools_boards.repository';
import { StudyToolsBoardsImgRepository } from '../repositories/study_tools_boardsIMG.repository';

@Injectable()
export class StudyToolsBoardsService {
  constructor(
    @InjectRepository(StudyToolsBoardsRepository)
    private studyToolsBoardsRepository: StudyToolsBoardsRepository,
    @InjectRepository(StudyToolsBoardsImgRepository)
    private studyToolsBoardsImgRepository: StudyToolsBoardsImgRepository,
  ) {}
  async createStudyBoard(userId, createBoardDto) {
    const req = {
      writer: userId,
      ...createBoardDto,
    };
    const result = await this.studyToolsBoardsRepository.createStudyToolsBoards(
      req,
    );
    return result.identifiers;
  }
  async uploadImg(url, boardId) {
    return await this.studyToolsBoardsImgRepository.uploadImg(url, boardId);
  }

  async deleteImg(boardId) {
    return await this.studyToolsBoardsImgRepository.deleteImg(boardId);
  }

  async getStudyToolsBoard(studyId, boardId) {
    return await this.studyToolsBoardsRepository.getStudyToolsBoard(
      studyId,
      boardId,
    );
  }

  async getStudyToolsBoardList(studyId) {
    return await this.studyToolsBoardsRepository.getStudyToolsBoardList(
      studyId,
    );
  }

  async updateStudyToolsBoard(updateBoardDto) {
    return await this.studyToolsBoardsRepository.updateStudyToolsBoard(
      updateBoardDto,
    );
  }

  async deleteStudyToolsBoard(boardId) {
    return await this.studyToolsBoardsRepository.deleteStudyToolsBoard(boardId);
  }

  async checkBoard(id) {
    const checkBoard = await this.studyToolsBoardsRepository.checkBoard(
      id.boardId,
    );
    if (!checkBoard[0]) throw new BadRequestException('게시물 없음');
    return true;
  }
}
