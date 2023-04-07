import { EntityRepository, Repository } from 'typeorm';
import { Study } from 'src/study/entities/sudy.entity';

@EntityRepository(Study)
export class StudyRepository extends Repository<Study> {}
