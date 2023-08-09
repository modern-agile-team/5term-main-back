import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudyToolsTimetableRepository } from '@src/study/repositories/study_tools_timetable.repository';

@Injectable()
export class StudyToolsTimetableService {
  constructor(
    @InjectRepository(StudyToolsTimetableRepository)
    private studyToolsTimetableRepository: StudyToolsTimetableRepository,
  ) {}

  async createTimetable(timetable) {
    return this.studyToolsTimetableRepository.createTimetable(timetable);
  }

  async getTimetable(studyId) {
    return this.studyToolsTimetableRepository.getTimetable(studyId);
  }

  async updateTimetable(updateTimetableDto) {
    return this.studyToolsTimetableRepository.updateTimetable(
      updateTimetableDto,
    );
  }

  async deleteTimetable(timetableId) {
    return this.studyToolsTimetableRepository.deleteTimetable(timetableId);
  }

  async checkWriter(userId, timetableId) {
    const checkWriter = await this.studyToolsTimetableRepository.find({
      where: { id: timetableId, writer: userId },
    });
    if (!checkWriter[0]) throw new ForbiddenException('권한 없음');
    return true;
  }

  async checkTimetable(timetableId) {
    const checkTimetable =
      await this.studyToolsTimetableRepository.checkTimetable(timetableId);
    if (!checkTimetable[0])
      throw new BadRequestException('존재하지 않는 시간표');
    return checkTimetable;
  }
}
