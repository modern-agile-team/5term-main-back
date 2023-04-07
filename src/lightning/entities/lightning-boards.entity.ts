import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'lightning_recruitment_boards',
})
export class LightningBoardEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @IsNotEmpty({ message: '제목을 입력해주세요' })
  @Column({ type: 'varchar', nullable: false })
  title: string;

  @IsString()
  @IsNotEmpty({ message: '내용을 입력해주세요' })
  @Column({ type: 'text', nullable: true })
  contents: string;

  @ManyToOne(() => User, (author: User) => author.lightningBoard, {
    onDelete: 'CASCADE',
  })
  @JoinColumn([
    {
      name: 'author' /* db에 저장되는 필드 이름 */,
      referencedColumnName: 'id' /* USER의 id */,
    },
  ])
  author: User;
}
