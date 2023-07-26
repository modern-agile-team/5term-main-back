import { EntityRepository, Repository } from 'typeorm';
import { StudyAdmins } from '../entities/study.admins.entity';

@EntityRepository(StudyAdmins)
export class StudyAdminsRepository extends Repository<StudyAdmins> {
  async giveAdmin(userId, studyId) {
    return await this.createQueryBuilder()
      .insert()
      .values([{ study: studyId, user: userId }])
      .execute();
  }

  async transferAdmin(req) {
    const studyId = req.studyId;
    const userId = req.userId;

    return await this.createQueryBuilder()
      .update()
      .set({ user: userId })
      .where('study_id = :studyId', { studyId })
      .execute();
  }

  async checkAdmin(userId, studyId) {
    return await this.find({ user: userId, study: studyId });
  }
}
