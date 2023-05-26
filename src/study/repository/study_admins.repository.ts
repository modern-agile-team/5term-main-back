import { EntityRepository, Repository } from 'typeorm';
import { StudyAdmins } from '../entities/study_admins.entity';

@EntityRepository(StudyAdmins)
export class StudyAdminsRepository extends Repository<StudyAdmins> {
  async checkAdmin(userId, studyId) {
    const adminInfo = await this.createQueryBuilder()
      .select()
      .where({ study: studyId })
      .execute();

    return adminInfo[0].StudyAdmins_user_id === userId
      ? { success: true }
      : { success: false };
  }

  async giveAdmin(userId, studyId) {
    return await this.createQueryBuilder()
      .insert()
      .values([{ study: studyId, user: userId }])
      .execute();
  }

  async transferAdmin(userId, studyId) {
    return await this.createQueryBuilder()
      .update()
      .set({ user: userId })
      .where('study_id = :studyId', { studyId })
      .execute();
  }
}
