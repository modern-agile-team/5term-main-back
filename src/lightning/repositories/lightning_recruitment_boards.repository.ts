import { EntityRepository, Repository } from 'typeorm';
import { LightningBoardEntity } from '../entities/lightning-boards.entity';
import { User } from 'src/user/entities/user.entity';

@EntityRepository(LightningBoardEntity)
export class LightningBoardRepository extends Repository<LightningBoardEntity> {
  async createLightningBoard(
    title: string,
    contents: string,
    author: User,
  ): Promise<void> {
    try {
      await this.createQueryBuilder('lightning_recruitment_boards')
        .insert()
        .into(LightningBoardEntity)
        .values({ title, contents, author })
        .execute();
    } catch (error) {}
  }

  async deleteLightningBoard(boardNo: number): Promise<void> {
    try {
      await this.createQueryBuilder('lightning_recruitment_boards')
        .delete()
        .from(LightningBoardEntity)
        .where('id = :boardNo', { boardNo })
        .execute();
    } catch (error) {}
  }

  async updateLightningBoard(
    boardNo: number,
    title: string,
    contents: string,
  ): Promise<void> {
    try {
      await this.createQueryBuilder('lightning_recruitment_boards')
        .update(LightningBoardEntity)
        .set({ title, contents })
        .where('id = :boardNo', { boardNo })
        .execute();
    } catch (error) {}
  }

  async getLightningBoard(
    boardNo: number,
  ): Promise<LightningBoardEntity | null> {
    try {
      const result = await this.createQueryBuilder(
        'lightning_recruitment_boards',
      )
        .where('id = :boardNo', { boardNo })
        .getOne();
      return result || null;
    } catch (error) {
      throw new Error('Failed to get lightning board.');
    }
  }
}
