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

  updateCalendar(updateCalendarDto) {
    return this.createQueryBuilder()
      .update(StudyCalendar)
      .set({
        date: updateCalendarDto.date,
        content: updateCalendarDto.content,
      })
      .where({ id: updateCalendarDto.id })
      .execute();
  }
}
