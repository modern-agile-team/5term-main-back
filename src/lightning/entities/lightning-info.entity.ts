import { CommonEntity } from 'src/common/entities/common.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { LightningBoardEntity } from './lightning-boards.entity';
import { LightningToUserEntity } from './lightning-to-user.entity';

@Entity({
  name: 'lightning_info',
})
export class LightningInfoEntity extends CommonEntity {
  @Column({ type: 'int', nullable: false, default: 1 })
  active: number;

  @Column({ name: 'meeting_date', type: 'date', nullable: false })
  meetingDate: Date;

  @OneToMany(
    () => LightningBoardEntity,
    (board: LightningBoardEntity) => board.lightningNo,
  )
  lightningInfo: LightningBoardEntity[];

  @OneToMany(
    () => LightningToUserEntity,
    (lightningToUser) => lightningToUser.lightningInfo,
  )
  lightningToUser: LightningToUserEntity[];
}
