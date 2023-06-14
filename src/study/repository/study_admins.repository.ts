import { EntityRepository, Repository } from 'typeorm';
import { StudyAdmins } from '../entities/study_admins.entity';

@EntityRepository(StudyAdmins)
export class StudyAdminsRepository extends Repository<StudyAdmins> {
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
