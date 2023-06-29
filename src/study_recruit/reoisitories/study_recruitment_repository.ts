import { EntityRepository, Repository } from 'typeorm';
import { StudyRecruitBoardEntity } from '../entities/study_recruit_board.entity';

@EntityRepository(StudyRecruitBoardEntity)
export class StudyRecruitBoardRepository extends Repository<StudyRecruitBoardEntity> {
  async getWriter(updateStudyBoardDto) {
    const boardId = updateStudyBoardDto.boardId;
    return await this.createQueryBuilder('studyRecruitBoard')
      .select()
      .leftJoinAndSelect('studyRecruitBoard.writer', 'writer')
      .where('studyRecruitBoard.id = :boardId', { boardId })
      .getOne();
  }

  async createStudyRecruitBoard(studyRecruitBoard) {
    return await this.createQueryBuilder()
      .insert()
      .into(StudyRecruitBoardEntity)
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
}
