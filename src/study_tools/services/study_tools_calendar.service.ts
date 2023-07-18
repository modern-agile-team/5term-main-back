import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudyToolsCalendarsRepository } from '../repositories/study_tools_calendar.repository';

@Injectable()
export class StudyToolsCalendarService {
  constructor(
    @InjectRepository(StudyToolsCalendarsRepository)
    private studyToolsCalendarReposiotry: StudyToolsCalendarsRepository,
  ) {}

  createCalendar(createCalendar) {
    return this.studyToolsCalendarReposiotry.createCalendar(createCalendar);
  }

  getCalendar(studyId) {
    return this.studyToolsCalendarReposiotry.find({
      where: { study: studyId },
    });
  }

  async checkWriter(userId, timetableId) {
    return this.studyToolsCalendarReposiotry.find({
      where: { writer: userId, id: timetableId },
    });
  }

  async updateCalendar(updateCalendarDto) {
    return this.studyToolsCalendarReposiotry.updateCalendar(updateCalendarDto);
  }

  async deleteCalendar(calendarId) {
    return this.studyToolsCalendarReposiotry.deleteCalendar(calendarId);
  }
}
