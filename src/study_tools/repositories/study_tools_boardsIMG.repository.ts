import { EntityRepository, Repository } from 'typeorm';
import { StudyToolsBoardsImg } from '../entities/study.boardIMG.entity';

@EntityRepository(StudyToolsBoardsImg)
export class StudyToolsBoardsImgRepository extends Repository<StudyToolsBoardsImg> {
  async uploadImg(result, boardId) {
    return this.createQueryBuilder()
      .insert()
      .values({
        imgUrl: result.url,
        imgKey: result.key,
        studyToolsBoarsdId: boardId,
      })
      .execute();
  }
}
