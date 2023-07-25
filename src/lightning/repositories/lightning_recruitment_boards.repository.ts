import { EntityRepository, InsertResult, Repository } from 'typeorm';
import { LightningBoardEntity } from '@src/lightning/entities/lightning-boards.entity';
import { User } from '@src/user/entities/user.entity';

@EntityRepository(LightningBoardEntity)
export class LightningBoardRepository extends Repository<LightningBoardEntity> {
  async createLightningBoard(
    lightningId: number,
    title: string,
    contents: string,
    authorId: number,
  ): Promise<InsertResult> {
    const lightningBoard = new LightningBoardEntity();
    lightningBoard.title = title;
    lightningBoard.contents = contents;
    lightningBoard.author_id = authorId;
    lightningBoard.lightning_id = lightningId;

    const { raw } = await this.createQueryBuilder(
      'lightning_recruitment_boards',
    )
      .insert()
      .into(LightningBoardEntity)
      .values(lightningBoard)
      .execute();

    return raw;
  }

  async deleteLightningBoard(boardNo: number): Promise<number> {
    const { affected } = await this.createQueryBuilder(
      'lightning_recruitment_boards',
    )
      .delete()
      .from(LightningBoardEntity)
      .where('id = :boardNo', { boardNo })
      .execute();
    return affected;
  }

  async updateLightningBoard(
    boardNo: number,
    title: string,
    contents: string,
  ): Promise<number> {
    const { affected } = await this.createQueryBuilder(
      'lightning_recruitment_boards',
    )
      .update(LightningBoardEntity)
      .set({ title, contents })
      .where('id = :boardNo', { boardNo })
      .execute();
    return affected;
  }

  async getLightningBoard(boardNo: number): Promise<LightningBoardEntity> {
    const result = await this.createQueryBuilder('lightning_recruitment_boards')
      .where('id = :boardNo', { boardNo })
      .getOne();
    return result;
  }

  async getAllLightningBoard(): Promise<LightningBoardEntity[]> {
    const result = await this.createQueryBuilder().getMany();
    return result;
  }

  async getAllLightingRecruitmentBoardsByUserNo(userId: number) {
    return await this.createQueryBuilder('l')
      .select([
        'l.id AS id',
        'l.title AS title',
        `TO_CHAR(l.createdAt, 'YYYY-MM-DD HH24:MI') AS createdAt`,
      ])
      .where('author_id = :author_id', { author_id: userId })
      .getRawMany();
  }
}
