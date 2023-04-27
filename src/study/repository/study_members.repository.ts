import { EntityRepository, Repository } from 'typeorm';
import { StudyMembers } from '../entities/study_members.entity';

@EntityRepository(StudyMembers)
export class StudyMembersRepository extends Repository<StudyMembers> {}
