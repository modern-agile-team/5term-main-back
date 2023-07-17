import { EntityRepository, Repository } from 'typeorm';
import { StudyTimetable } from '../entities/study.timetable.entity';

@EntityRepository(StudyTimetable)
export class StudyToolsTimetableRepository extends Repository<StudyTimetable> {
  async createTimetable(timetable) {
    return this.createQueryBuilder()
      .insert()
      .into(StudyTimetable)
      .values(timetable)
      .execute();
  }
}
