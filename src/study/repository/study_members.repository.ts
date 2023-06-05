import { EntityRepository, Repository } from 'typeorm';
import { StudyToUserEntity } from '../entities/study_to_user.entity';

@EntityRepository(StudyToUserEntity)
export class StudyMembersRepository extends Repository<StudyToUserEntity> {
  async getMembers(studyId: number) {
    return await this.createQueryBuilder()
      .where('study_id = :studyId', { studyId })
      .getRawMany();
  }

  async getStudies(userId) {
    return await this.createQueryBuilder()
      .select('id')
      .where('user_id = :userId', { userId })
      .getRawMany();
  }

  async joinStudyForAdmin(userId: number, studyId: number) {
    return await this.createQueryBuilder()
      .insert()
      .into(StudyToUserEntity)
      .values({ studyInfo: { id: studyId }, user: { id: userId }, isAccept: 1 })
      .execute();
  }
  async joinStudy(userId: number, studyId: number) {
    return await this.createQueryBuilder()
      .insert()
      .into(StudyToUserEntity)
      .values({ studyInfo: { id: studyId }, user: { id: userId } })
      .execute();
  }

  async exitStudy(userId: number, studyId: number) {
    const currentTime = new Date();
    return this.createQueryBuilder()
      .update()
      .set({ isAccept: 2, deletedAt: currentTime })
      .where('user_id = :userId', { userId })
      .andWhere('study_id = :studyId', { studyId })
      .execute();
  }

  async acceptStudy(userId, body) {
    const studyId = body.studyId;

    return this.createQueryBuilder()
      .update()
      .set({ isAccept: 1 })
      .where('user_id = :userId', { userId })
      .andWhere('study_id = :studyId', { studyId })
      .execute();
  }

  async rejectStudy(userId, req) {
    const studyId = req.studyId;

    return this.createQueryBuilder()
      .delete()
      .where('user_id = :userId', { userId })
      .andWhere('study_id = :studyId', { studyId })
      .execute();
  }
}
