import { EntityRepository, Repository } from 'typeorm';
import { StudyCalendar } from '@src/study/entities/study.calendar.entity';

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

  deleteCalendar(calendarId) {
    return this.createQueryBuilder()
      .softDelete()
      .where({ id: calendarId })
      .execute();
  }

  checkWriter(userId, calendarId) {
    return this.find({ writer: userId, id: calendarId });
  }

  checkCalendar(calendarId) {
    return this.find({ id: calendarId });
  }
}
