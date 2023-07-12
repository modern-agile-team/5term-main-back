import { EntityRepository, Repository } from 'typeorm';
import { StudyTimetable } from '../entities/study.timetable.entity';

@EntityRepository(StudyTimetable)
export class StudyTimetableRepository extends Repository<StudyTimetable> {}
