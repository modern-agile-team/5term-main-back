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
    {
      cascade: true, // 사용자를 통해 블로그가 추가, 수정, 삭제되고 사용자가 저장되면 추가된 블로그도 저장된다.
    },
  )
  lightningInfo: LightningBoardEntity[];

  @OneToMany(
    () => LightningToUserEntity,
    (lightningToUser) => lightningToUser.lightningInfo,
  )
  lightningToUser: LightningToUserEntity[];
}
