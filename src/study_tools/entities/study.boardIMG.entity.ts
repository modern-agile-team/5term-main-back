import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { StudyToolsBoards } from '@src/study_tools/entities/study.board.entity';

@Entity({
  name: 'study_board_img',
})
export class StudyToolsBoardsImg extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  imgUrl: string;

  @Column()
  imgKey: string;

  @ManyToOne(() => StudyToolsBoards, (studyToolsBoard) => studyToolsBoard.id)
  @JoinColumn({ name: 'studyToolstBoard_id' })
  studyToolsBoards: StudyToolsBoards;
}
