import { EntityRepository, InsertResult, Repository } from 'typeorm';
import { LightningToUserEntity } from '@src/lightning/entities/lightning-to-user.entity';

@EntityRepository(LightningToUserEntity)
export class LightningToUserRepository extends Repository<LightningToUserEntity> {
  async createLightningToUser(
    userId: number,
    lightningNo: number,
  ): Promise<InsertResult> {
    const { raw }: InsertResult = await this.createQueryBuilder()
      .insert()
      .into(LightningToUserEntity)
      .values({
        user: { id: userId },
        lightningInfo: { id: lightningNo },
        isAccept: 1,
        isAdmin: 1,
      })
      .execute();
    return raw;
  }

  async deleteLightningToUser(relationNo: number): Promise<number> {
    const { affected } = await this.createQueryBuilder()
      .delete()
      .from(LightningToUserEntity)
      .where('id = :relationNo', { relationNo })
      .execute();
    return affected;
  }

  async updateLightningAdmin(
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

  async getLightningToUser(relationNo: number): Promise<LightningToUserEntity> {
    const result = await this.createQueryBuilder()
      .where('id = :relationNo', { relationNo })
      .getOne();
    return result;
  }

  async requestLightningToUser(
    userId: number,
    lightningNo: number,
  ): Promise<InsertResult> {
    const { raw }: InsertResult = await this.createQueryBuilder()
      .insert()
      .into(LightningToUserEntity)
      .values({
        user: { id: userId },
        lightningInfo: { id: lightningNo },
        isAccept: 0,
        isAdmin: 0,
      })
      .execute();
    return raw;
  }

  async getLightningByUser(userId: number): Promise<LightningToUserEntity[]> {
    const result = await this.createQueryBuilder('lightning')
      .select('lightning.lightning_no AS id')
      .where('lightning.user_no = :userNo AND lightning.is_accept = 1', {
        userId,
      })
      .getRawMany();
    return result;
  }

  async getUserByLightning(
    lightningNo: number,
  ): Promise<LightningToUserEntity[]> {
    const result = await this.createQueryBuilder('lightning')
      .select('lightning.id AS relationNo,lightning.user_no AS userNo')
      .where(
        'lightning.lightning_no = :lightningNo AND lightning.is_accept = 1',
        {
          lightningNo,
        },
      )
      .getRawMany();
    return result;
  }

  async getLightningApplicant(
    lightningNo: number,
  ): Promise<LightningToUserEntity[]> {
    const result = await this.createQueryBuilder('lightning')
      .select('lightning.id AS relationNo,lightning.user_no AS userNo')
      .where(
        'lightning.lightning_no = :lightningNo AND lightning.is_accept = 0',
        {
          lightningNo,
        },
      )
      .getRawMany();
    return result;
  }
}
