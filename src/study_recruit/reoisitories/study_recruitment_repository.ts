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
}
