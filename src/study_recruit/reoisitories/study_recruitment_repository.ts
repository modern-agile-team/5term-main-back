import { EntityRepository, Repository } from 'typeorm';
import { StudyRecruitBoardEntity } from '../entities/study_recruit_board.entity';

@EntityRepository(StudyRecruitBoardEntity)
export class StudyRecruitBoardRepository extends Repository<StudyRecruitBoardEntity> {
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
}
