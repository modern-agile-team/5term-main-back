import { EntityRepository, Repository, InsertResult } from 'typeorm';
import { StudyToUserEntity } from '../entities/study_to_user.entity';

@EntityRepository(StudyToUserEntity)
export class StudyMembersRepository extends Repository<StudyToUserEntity> {
  async joinStudy(userId: number, studyId: number): Promise<InsertResult> {
    return this.createQueryBuilder()
      .insert()
      .values({
        user_id: userId,
        study_id: studyId,
      } as Partial<StudyToUserEntity>)
      .execute();
  }
}
