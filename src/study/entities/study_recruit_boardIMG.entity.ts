import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { StudyRecruitBoard } from '@src/study/entities/study_recruit_board.entity';

@Entity({
  name: 'study_recruit_board_img',
})
export class StudyRecruitBoardImg extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  imgUrl: string;

  @Column()
  imgKey: string;

  @ManyToOne(
    () => StudyRecruitBoard,
    (studyRecruitBoard) => studyRecruitBoard.id,
  )
  @JoinColumn({ name: 'studyRecruitBoardId_id' })
  studyRecruitBoardId: StudyRecruitBoard;
}
