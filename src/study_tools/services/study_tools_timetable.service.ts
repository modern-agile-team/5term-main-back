import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudyMembersRepository } from 'src/study/repository/study_members.repository';
import { StudyToolsTimetableRepository } from '../repositories/study_tools_timetable.repository';

@Injectable()
export class StudyToolsTimetableService {
  constructor(
    @InjectRepository(StudyMembersRepository)
    private studyMembersRepository: StudyMembersRepository,
    @InjectRepository(StudyToolsTimetableRepository)
    private studyToolsTimetableRepository: StudyToolsTimetableRepository,
  ) {}

  async checkAccess(userId, studyId) {
    return this.studyMembersRepository.find({
      where: { user: userId, study: studyId },
    });
  }

  async checkWriter(userId, timetableId) {
    return this.studyToolsTimetableRepository.find({
      where: { writer: userId, id: timetableId },
    });
  }

  async createTimetable(timetable) {
    return this.studyToolsTimetableRepository.createTimetable(timetable);
  }

  async getTimetable(studyId) {
    return this.studyToolsTimetableRepository.find({
      where: { study: studyId },
    });
  }

  async updateTimetable(updateTimetableDto) {
    return this.studyToolsTimetableRepository.updateTimetable(
      updateTimetableDto,
    );
  }

  async deleteTimetable(timetableId) {
    return this.studyToolsTimetableRepository.deleteTimetable(timetableId);
  }
}
