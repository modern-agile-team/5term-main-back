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
}
