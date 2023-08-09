import { EntityRepository, Repository } from 'typeorm';
import { StudyToolsBoardsImg } from '@src/study/entities/study.tools.boardIMG.entity';

@EntityRepository(StudyToolsBoardsImg)
export class StudyToolsBoardsImgRepository extends Repository<StudyToolsBoardsImg> {
  async uploadImg(result, boardId) {
    return this.createQueryBuilder()
      .insert()
      .values({
        imgUrl: result.url,
        imgKey: result.key,
        studyToolsBoards: boardId,
      })
      .execute();
  }

  async deleteImg(boardId) {
    return this.createQueryBuilder()
      .delete()
      .where({
        studyToolsBoards: boardId,
      })
      .execute();
  }
}
