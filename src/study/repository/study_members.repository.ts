import { EntityRepository, Repository } from 'typeorm';
import { StudyToUserEntity } from '../entities/study_to_user.entity';

@EntityRepository(StudyToUserEntity)
export class StudyMembersRepository extends Repository<StudyToUserEntity> {
  async getMembers(studyId: number) {
    return await this.createQueryBuilder()
      .where('study_id = :studyId', { studyId })
      .getRawMany();
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
}
