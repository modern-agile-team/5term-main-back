import { EntityRepository, Repository } from 'typeorm';
import { Study } from 'src/study/entities/study.entity';

@EntityRepository(Study)
export class StudyRepository extends Repository<Study> {
  createStudy(content) {
    return this.createQueryBuilder()
      .insert()
      .values([{ end_date: content.endDate, active: content.active }])
      .execute();
  }

  async getStudy(studyId) {
    return await this.createQueryBuilder('study')
      .leftJoinAndSelect('study.studyAdmin', 'admin')
      .leftJoinAndSelect('admin.user', 'adminUser')
      .leftJoinAndSelect('study.studyToUser', 'member')
      .leftJoinAndSelect('member.user', 'memberUser')
      .where('study.id = :studyId', { studyId })
      .getMany();
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
