import { EntityRepository, Repository } from 'typeorm';
import { StudyToolsBoards } from '@src/study/entities/study.tools.board.entity';

@EntityRepository(StudyToolsBoards)
export class StudyToolsBoardsRepository extends Repository<StudyToolsBoards> {
  async createStudyToolsBoards(studyToolsBoards) {
    return await this.createQueryBuilder()
      .insert()
      .into(StudyToolsBoards)
      .values(studyToolsBoards)
      .execute();
  }

  async getStudyToolsBoard(studyId, boardId) {
    return await this.createQueryBuilder('studyToolsBoards')
      .leftJoinAndSelect('studyToolsBoards.studyToolsBoardsImg', 'img')
      .where('studyToolsBoards.study = :studyId', { studyId })
      .andWhere('studyToolsBoards.id = :boardId', { boardId })
      .getOne();
  }

  async getStudyToolsBoardList(studyId) {
    return await this.createQueryBuilder('studyToolsBoards')
      .select()
      .where('studyToolsBoards.study = :studyId', { studyId })
      .getMany();
  }

  async getWriter(boardId) {
    return await this.createQueryBuilder('studyToolsBoards')
      .select()
      .leftJoinAndSelect('studyToolsBoards.writer', 'writer')
      .where('studyToolsBoards.id = :boardId', { boardId })
      .getOne();
  }

  async updateStudyToolsBoard(body) {
    const boardId = body.boardId;
    return await this.createQueryBuilder('')
      .update(StudyToolsBoards)
      .set({
        title: body.title,
        content: body.content,
      })
      .where('id = :boardId', { boardId })
      .execute();
  }

  async deleteStudyToolsBoard(boardId) {
    return await this.createQueryBuilder()
      .softDelete()
      .where({ id: boardId })
      .execute();
  }

  async checkBoard(boardId) {
    return await this.find({ id: boardId });
  }
}
