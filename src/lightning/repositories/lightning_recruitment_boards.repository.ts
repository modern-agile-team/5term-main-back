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
}
