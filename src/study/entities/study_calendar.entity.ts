import { CommonEntity } from 'src/common/entities/common.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Study } from './study.entity';

@Entity()
export class StudyCalendar extends CommonEntity {
  @ManyToOne(() => Study)
  @JoinColumn({ name: 'study_id' })
  study: Study;

  @Column()
  date: Date;

  @Column()
  content: string;
}
