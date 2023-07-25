import { EntityRepository, Repository } from 'typeorm';
import { StudyRecruitBoard } from '@src/study_recruit/entities/study_recruit_board.entity';

@EntityRepository(StudyRecruitBoard)
export class StudyRecruitBoardRepository extends Repository<StudyRecruitBoard> {
  async getWriter(boardId) {
    return await this.createQueryBuilder('studyRecruitBoard')
      .select()
      .leftJoinAndSelect('studyRecruitBoard.writer', 'writer')
      .where('studyRecruitBoard.id = :boardId', { boardId })
      .getOne();
  }

  async createStudyRecruitBoard(studyRecruitBoard) {
    return await this.createQueryBuilder()
      .insert()
      .into(StudyRecruitBoard)
      .values(studyRecruitBoard)
      .execute();
  }

  async getStudyRecruitBoard(boardId) {
    return await this.createQueryBuilder('studyRecruitBoard')
      .leftJoinAndSelect('studyRecruitBoard.study', 'study')
      .leftJoinAndSelect('studyRecruitBoard.writer', 'writer')
      .where('studyRecruitBoard.id = :boardId', { boardId })
      .getOne();
  }

  async updateStudyRecruitBoard(updateStudyBoardDto) {
    const boardId = updateStudyBoardDto.boardId;

    return await this.createQueryBuilder()
      .update()
      .set({
        title: updateStudyBoardDto.title,
        contents: updateStudyBoardDto.contents,
      })
      .where('study_recruit_board.id = :boardId', { boardId })
      .execute();
  }

  async deleteStudyRecruitBoard(boardId) {
    return await this.createQueryBuilder()
      .softDelete()
      .where({ id: boardId })
      .execute();
  }
}
