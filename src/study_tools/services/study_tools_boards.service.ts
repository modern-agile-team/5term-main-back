import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudyMembersRepository } from 'src/study/repository/study_members.repository';
import { StudyToolsBoardsRepository } from '../repositories/study_tools_boards.repository';
import { StudyToolsBoardsImgRepository } from '../repositories/study_tools_boardsIMG.repository';

@Injectable()
export class StudyToolsBoardsService {
  constructor(
    @InjectRepository(StudyMembersRepository)
    private studyMembersRepository: StudyMembersRepository,
    @InjectRepository(StudyToolsBoardsRepository)
    private studyToolsBoardsRepository: StudyToolsBoardsRepository,
    @InjectRepository(StudyToolsBoardsImgRepository)
    private studyToolsBoardsImgRepository: StudyToolsBoardsImgRepository,
  ) {}
  async createStudyBoard(userId, body) {
    const req = {
      writer: userId,
      title: body.title,
      study: Number(body.studyId),
      contents: body.contents,
    };
    const checkAccess = await this.studyMembersRepository.find({
      where: { user: req.writer, study: req.study },
    });
    if (!!checkAccess[0] === false)
      throw new UnauthorizedException('작성 권한 없음');

    const result = await this.studyToolsBoardsRepository.createStudyToolsBoards(
      req,
    );
    return result.identifiers;
  }
  async uploadImg(url, boardId) {
    return await this.studyToolsBoardsImgRepository.uploadImg(url, boardId);
  }
}
