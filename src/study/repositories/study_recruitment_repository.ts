import { EntityRepository, Repository } from 'typeorm';
import { StudyRecruitBoard } from '@src/study/entities/study_recruit_board.entity';

@EntityRepository(StudyRecruitBoard)
export class StudyRecruitBoardRepository extends Repository<StudyRecruitBoard> {
  getWriter(boardId) {
    return this.createQueryBuilder('studyRecruitBoard')
      .select()
      .leftJoinAndSelect('studyRecruitBoard.writer', 'writer')
      .where('studyRecruitBoard.id = :boardId', { boardId })
      .getOne();
  }

  createStudyRecruitBoard(studyRecruitBoard) {
    return this.createQueryBuilder()
      .insert()
      .into(StudyRecruitBoard)
      .values(studyRecruitBoard)
      .execute();
  }

  getStudyRecruitBoard(boardId) {
    return this.createQueryBuilder('studyRecruitBoard')
      .leftJoinAndSelect('studyRecruitBoard.study', 'study')
      .leftJoinAndSelect('studyRecruitBoard.writer', 'writer')
      .where('studyRecruitBoard.id = :boardId', { boardId })
      .getOne();
  }

  updateStudyRecruitBoard(updateStudyBoardDto) {
    const boardId = updateStudyBoardDto.boardId;

    return this.createQueryBuilder()
      .update()
      .set({
        title: updateStudyBoardDto.title,
        contents: updateStudyBoardDto.contents,
      })
      .where('study_recruit_board.id = :boardId', { boardId })
      .execute();
  }

  deleteStudyRecruitBoard(boardId) {
    return this.createQueryBuilder()
      .softDelete()
      .where({ id: boardId })
      .execute();
  }
}
