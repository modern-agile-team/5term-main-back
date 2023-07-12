import { EntityRepository, Repository } from 'typeorm';
import { StudyCalendar } from '../entities/study.calendar.entity';

@EntityRepository(StudyCalendar)
export class StudyCalendarsRepository extends Repository<StudyCalendar> {}