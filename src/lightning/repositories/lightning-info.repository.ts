import { LightningToUserEntity } from '@src/lightning/entities/lightning-to-user.entity';
import { LightningInfoEntity } from '@src/lightning/entities/lightning-info.entity';
import { EntityRepository, InsertResult, Repository } from 'typeorm';

@EntityRepository(LightningInfoEntity)
export class LightningInfoRepository extends Repository<LightningInfoEntity> {
  async createLightningInfo(meetingDate: Date): Promise<number> {
    const { raw }: InsertResult = await this.createQueryBuilder()
      .insert()
      .into(LightningInfoEntity)
      .values({ meetingDate })
      .execute();

    return raw[0].id;
  }

  async deleteLightningInfo(relationNo: number): Promise<number> {
    const { affected } = await this.createQueryBuilder()
      .delete()
      .from(LightningInfoEntity)
      .where('id = :relationNo', { relationNo })
      .execute();
    return affected;
  }

  async updateLightningInfo(
    lightningNo: number,
    meetingDate: Date,
  ): Promise<number> {
    const { affected } = await this.createQueryBuilder()
      .update(LightningInfoEntity)
      .set({ meetingDate })
      .where('id = :lightningNo', { lightningNo })
      .execute();
    return affected;
  }

  async getLightningInfo(lightningNo: number): Promise<LightningInfoEntity> {
    const result = await this.createQueryBuilder()
      .where('id = :lightningNo', { lightningNo })
      .getOne();
    return result;
  }
}
