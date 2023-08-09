import { EntityRepository, Repository } from 'typeorm';
import { StudyRecruitBoardImg } from '@src/study/entities/study_recruit_boardIMG.entity';

@EntityRepository(StudyRecruitBoardImg)
export class StudyRecruitBoardImgRepository extends Repository<StudyRecruitBoardImg> {
  async uploadImg(result, boardId) {
    return this.createQueryBuilder()
      .insert()
      .values({
        imgUrl: result.url,
        imgKey: result.key,
        studyRecruitBoardId: boardId,
      })
      .execute();
  }
  async deleteImg(boardId) {
    return this.createQueryBuilder()
      .delete()
      .where({
        studyRecruitBoardId: boardId,
      })
      .execute();
  }
}
