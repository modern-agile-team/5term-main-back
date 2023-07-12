import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { StudyToolsBoards } from './study.board.entity';

@Entity({
  name: 'study_board_img',
})
export class StudyboardsIMG extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  imgUrl: string;

  @Column()
  imgKey: string;

  @ManyToOne(() => StudyToolsBoards, (studyToolsBoard) => studyToolsBoard.id)
  @JoinColumn({ name: 'studyToolstBoardId_id' })
  studyToolstBoarsdId: StudyToolsBoards;
}
