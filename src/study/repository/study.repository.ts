import { EntityRepository, Repository } from 'typeorm';
import { Study } from 'src/study/entities/study.entity';

@EntityRepository(Study)
export class StudyRepository extends Repository<Study> {
  async createStudy(content) {
    return await this.createQueryBuilder()
      .insert()
      .values([{ end_date: content.endDate, active: content.active }])
      .execute();
  }

  async getStudyInfo(studyId) {
    return await this.createQueryBuilder()
      .where('id = :studyId', { studyId })
      .getRawMany();
  }

  async deleteStudy(studyId) {
    const currentTime = new Date();
    return await this.createQueryBuilder()
      .update()
      .set({ active: false, deletedAt: currentTime })
      .where('id = :studyId', { studyId })
      .execute();
  }
}
