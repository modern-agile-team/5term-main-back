import { LightningToUserEntity } from '../entities/lightning-to-user.entity';
import { LightningInfoEntity } from './../entities/lightning-info.entity';
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
  async createLightningToUser(
    userNo: number,
    lightningNo: number,
  ): Promise<InsertResult> {
    const { raw }: InsertResult = await this.createQueryBuilder()
      .insert()
      .into(LightningToUserEntity)
      .values({
        user: { id: userNo },
        lightningInfo: { id: lightningNo },
        isAccept: 1,
        isAdmin: 1,
      })
      .execute();
    return raw;
  }

  async inviteLightningToUser(
    userNo: number,
    lightningNo: number,
  ): Promise<InsertResult> {
    const { raw }: InsertResult = await this.createQueryBuilder()
      .insert()
      .into(LightningToUserEntity)
      .values({
        user: { id: userNo },
        lightningInfo: { id: lightningNo },
        isAccept: 0,
        isAdmin: 0,
      })
      .execute();
    return raw;
  }

  async deleteLightningInfo(boardNo: number): Promise<number> {
    const { affected } = await this.createQueryBuilder()
      .delete()
      .from(LightningInfoEntity)
      .where('id = :boardNo', { boardNo })
      .execute();
    return affected;
  }

  async deleteLightningToUser(relationNo: number): Promise<number> {
    const { affected } = await this.createQueryBuilder()
      .delete()
      .from(LightningToUserEntity)
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

  async updateLightningToUser(
    relationNo: number,
    isAdmin: number,
  ): Promise<number> {
    const { affected } = await this.createQueryBuilder()
      .update(LightningToUserEntity)
      .set({ isAdmin })
      .where('id = :relationNo', { relationNo })
      .execute();
    return affected;
  }

  async acceptLightningToUser(
    relationNo: number,
    isAccept: number,
  ): Promise<number> {
    const { affected } = await this.createQueryBuilder()
      .update(LightningToUserEntity)
      .set({ isAccept })
      .where('id = :relationNo', { relationNo })
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
