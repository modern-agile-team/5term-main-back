import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { LightningInfoEntity } from './lightning-info.entity';

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
      name: 'author',
      referencedColumnName: 'id',
    },
  ])
  author: User;

  @ManyToOne(
    () => LightningInfoEntity,
    (lightningNo: LightningInfoEntity) => lightningNo.lightningInfo,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn([
    {
      name: 'lightning_no',
      referencedColumnName: 'id',
    },
  ])
  lightningNo: LightningInfoEntity;
}
