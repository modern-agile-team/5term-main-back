import { EntityRepository, Repository } from 'typeorm';
import { StudyCalendar } from '../entities/study.calendar.entity';

@EntityRepository(StudyCalendar)
export class StudyToolsCalendarsRepository extends Repository<StudyCalendar> {
  createCalendar(createCalendar) {
    return this.createQueryBuilder()
      .insert()
      .into(StudyCalendar)
      .values(createCalendar)
      .execute();
  }
}
