import { EntityRepository, Repository, InsertResult } from 'typeorm';
import { StudyToUserEntity } from '../entities/study_to_user.entity';

@EntityRepository(StudyToUserEntity)
export class StudyMembersRepository extends Repository<StudyToUserEntity> {
  async joinStudy(userId: number, studyId: number) {
    return await this.createQueryBuilder()
      .insert()
      .into(StudyToUserEntity)
      .values({ studyInfo: { id: studyId }, user: { id: userId } })
      .execute();
  }

  // async joinStudy(userId: number, studyId: number) {
  //   return this.createQueryBuilder()
  //     .insert()
  //     .values({ user_id: userId, study_id: studyId })
  //     .execute();
  // }

  async exitStudy(userId: number, studyId: number) {
    return this.createQueryBuilder()
      .delete()
      .where('study_id = :studyId', { studyId: studyId })
      .andWhere('user_id = :userId', { userId: userId })
      .execute();
  }
}
