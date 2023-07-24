import { EntityRepository, Repository } from 'typeorm';
import { StudyTimetable } from '../entities/study.timetable.entity';

@EntityRepository(StudyTimetable)
export class StudyToolsTimetableRepository extends Repository<StudyTimetable> {
  createTimetable(timetable) {
    return this.createQueryBuilder()
      .insert()
      .into(StudyTimetable)
      .values(timetable)
      .execute();
  }

  updateTimetable(updateTimetableDto) {
    return this.createQueryBuilder()
      .update(StudyTimetable)
      .set({
        schedule: updateTimetableDto.schedule,
        content: updateTimetableDto.content,
      })
      .where({ id: updateTimetableDto.id })
      .execute();
  }

  deleteTimetable(timetableId) {
    return this.createQueryBuilder()
      .softDelete()
      .where({ id: timetableId })
      .execute();
  }

  checkTimetable(timetableId) {
    return this.find({ id: timetableId });
  }

  getTimetable(studyId) {
    return this.find({ study: studyId });
  }
}
