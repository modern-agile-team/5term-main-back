import { LightningInfoEntity } from './../entities/lightning-info.entity';

import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(LightningInfoEntity)
export class LightningInfoRepository extends Repository<LightningInfoEntity> {
  async createLightningInfo(meetingDate: Date): Promise<void> {
    try {
      await this.createQueryBuilder('lightning_info')
        .insert()
        .into(LightningInfoEntity)
        .values({ meetingDate })
        .execute();
    } catch (error) {}
  }
}
