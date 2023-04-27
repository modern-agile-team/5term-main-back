import { LightningInfoEntity } from './../entities/lightning-info.entity';
import { EntityRepository, InsertResult, Repository } from 'typeorm';

@EntityRepository(LightningInfoEntity)
export class LightningInfoRepository extends Repository<LightningInfoEntity> {
  async createLightningInfo(meetingDate: Date): Promise<InsertResult> {
    try {
      const { raw }: InsertResult = await this.createQueryBuilder()
        .insert()
        .into(LightningInfoEntity)
        .values({ meetingDate })
        .execute();

      return raw;
    } catch (error) {
      throw new Error();
    }
  }
}
