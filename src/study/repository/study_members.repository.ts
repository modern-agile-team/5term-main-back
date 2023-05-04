import { EntityRepository, Repository } from 'typeorm';
import { StudyMembers } from '../entities/study_members.entity';

@EntityRepository(StudyMembers)
export class StudyMembersRepository extends Repository<StudyMembers> {
  async joinStudy(userId, studyId) {
    return this.createQueryBuilder()
      .insert()
      .values([{ study: studyId, user: userId }])
      .execute();
  }
}
