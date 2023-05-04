import { EntityRepository, Repository } from 'typeorm';
import { Study } from 'src/study/entities/study.entity';

@EntityRepository(Study)
export class StudyRepository extends Repository<Study> {
  async createStudy(body) {
    return await this.createQueryBuilder()
      .insert()
      .values([{ end_date: body.endDate, active: body.active }])
      .execute();
  }
}
