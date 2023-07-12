import { EntityRepository, Repository } from 'typeorm';
import { StudyToolsBoards } from '../entities/study.board.entity';

@EntityRepository(StudyToolsBoards)
export class StudyTollsBoards extends Repository<StudyToolsBoards> {}
