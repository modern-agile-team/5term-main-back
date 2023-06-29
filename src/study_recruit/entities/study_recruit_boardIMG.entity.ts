import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { StudyRecruitBoard } from './study_recruit_board.entity';

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

  @OneToOne(() => StudyRecruitBoard)
  @JoinColumn({ name: 'studyRecruitBoardId_id' })
  studyRecruitBoardId: StudyRecruitBoard;
}
