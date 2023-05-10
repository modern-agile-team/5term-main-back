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
}
