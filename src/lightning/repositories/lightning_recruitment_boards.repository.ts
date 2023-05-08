import { EntityRepository, Repository } from 'typeorm';
import { LightningBoardEntity } from '../entities/lightning-boards.entity';
import { User } from 'src/user/entities/user.entity';

@EntityRepository(LightningBoardEntity)
export class LightningBoardRepository extends Repository<LightningBoardEntity> {
  async createLightningBoard(
    lightningNo: number,
    title: string,
    contents: string,
    author: User,
  ): Promise<void> {
    const lightningBoard = new LightningBoardEntity();
    lightningBoard.title = title;
    lightningBoard.contents = contents;
    lightningBoard.author = author;
    lightningBoard.lightningNo = lightningNo;
    await this.createQueryBuilder('lightning_recruitment_boards')
      .insert()
      .into(LightningBoardEntity)
      .values(lightningBoard)
      .execute();
  }

  async deleteLightningBoard(boardNo: number): Promise<void> {
    await this.createQueryBuilder('lightning_recruitment_boards')
      .delete()
      .from(LightningBoardEntity)
      .where('id = :boardNo', { boardNo })
      .execute();
  }

  async updateLightningBoard(
    boardNo: number,
    title: string,
    contents: string,
  ): Promise<void> {
    await this.createQueryBuilder('lightning_recruitment_boards')
      .update(LightningBoardEntity)
      .set({ title, contents })
      .where('id = :boardNo', { boardNo })
      .execute();
  }

  async getLightningBoard(boardNo: number): Promise<LightningBoardEntity> {
    const result = await this.createQueryBuilder('lightning_recruitment_boards')
      .where('id = :boardNo', { boardNo })
      .getOne();
    return result;
  }

  async getAllLightningBoard(): Promise<LightningBoardEntity[]> {
    const result = await this.createQueryBuilder('lightning_recruitment_boards')
      .select()
      .from(LightningBoardEntity, 'lightningBoard')
      .getMany();
    return result;
  }
}
