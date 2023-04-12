import { IsNotEmpty, IsDate, IsNumber } from 'class-validator';
import { CommonEntity } from 'src/common/entities/common.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { LightningBoardEntity } from './lightning-boards.entity';

@Entity({
  name: 'lightning_info',
})
export class LightningInfoEntity extends CommonEntity {
  @IsNumber()
  @Column({ type: 'int', nullable: false, default: 1 })
  active: number;

  @IsDate()
  @IsNotEmpty({ message: '만남 날짜를 입력해주세요' })
  @Column({ name: 'meeting_date', type: 'date', nullable: false })
  meetingDate: Date;

  @ManyToMany(() => User, (user: User) => user.id)
  users: User[];

  @OneToMany(
    () => LightningBoardEntity,
    (board: LightningBoardEntity) => board.lightningNo,
    {
      cascade: true, // 사용자를 통해 블로그가 추가, 수정, 삭제되고 사용자가 저장되면 추가된 블로그도 저장된다.
    },
  )
  lightningInfo: LightningBoardEntity;
}
