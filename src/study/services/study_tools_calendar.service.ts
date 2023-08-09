import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudyToolsCalendarsRepository } from '@src/study/repositories/study_tools_calendar.repository';

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

  async checkWriter(userId, calendarId) {
    const checkWriter = await this.studyToolsCalendarReposiotry.checkWriter(
      userId,
      calendarId,
    );
    if (!checkWriter[0]) throw new ForbiddenException('수정 권한 없음');
    return true;
  }

  async checkCalendar(calendarId) {
    const checkCalendar = await this.studyToolsCalendarReposiotry.checkCalendar(
      calendarId,
    );
    if (!checkCalendar[0]) throw new ForbiddenException('존재하지 않는 일정');
    return true;
  }

  async updateCalendar(updateCalendarDto) {
    return this.studyToolsCalendarReposiotry.updateCalendar(updateCalendarDto);
  }

  async deleteCalendar(calendarId) {
    return this.studyToolsCalendarReposiotry.deleteCalendar(calendarId);
  }
}
