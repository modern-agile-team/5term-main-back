import { Study } from 'src/study/entities/study.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'study_recruit_board_img',
})
export class RecruitboardIMG extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  imgUrl: string;

  @Column()
  imgKey: string;

  @OneToOne(() => Study)
  @JoinColumn({ name: 'study_id' })
  studyId: Study;
}
