import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { CommonEntity } from 'src/common/entities/common.entity';
import { LightningInfoEntity } from './lightning-info.entity';
import { User } from 'src/user/entities/user.entity';

@Entity({
  name: 'lightning_to_user',
})
export class LightningToUser extends CommonEntity {
  @ManyToOne(
    () => LightningInfoEntity,
    (lightningInfo) => lightningInfo.lightningToUser,
  )
  @JoinColumn({
    name: 'lightning_no',
    referencedColumnName: 'id',
  })
  lightningInfo: LightningInfoEntity;

  @ManyToOne(() => User, (user) => user.lightningToUser)
  @JoinColumn({
    name: 'user_no',
    referencedColumnName: 'id',
  })
  user: User;

  //수락 대기중 = 0 수락 = 1 거절 = 2
  @Column({ name: 'is_accept', type: 'int', nullable: false, default: 0 })
  isAccept: number;

  //관리자 = 1 구성원 = 0
  @Column({ name: 'is_admin', type: 'int', nullable: false })
  isAdmin: number;
}
