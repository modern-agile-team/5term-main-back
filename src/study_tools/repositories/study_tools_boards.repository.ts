import { EntityRepository, Repository } from 'typeorm';
import { StudyToolsBoards } from '../entities/study.board.entity';

@EntityRepository(StudyToolsBoards)
export class StudyToolsBoardsRepository extends Repository<StudyToolsBoards> {
  async createStudyToolsBoards(studyToolsBoards) {
    return await this.createQueryBuilder()
      .insert()
      .into(StudyToolsBoards)
      .values(studyToolsBoards)
      .execute();
  }
}
