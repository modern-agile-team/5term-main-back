import { User } from 'src/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { LightningInfoEntity } from './lightning-info.entity';
import { CommonEntity } from 'src/common/entities/common.entity';

@Entity({
  name: 'lightning_recruitment_boards',
})
export class LightningBoardEntity extends CommonEntity {
  @Column({ type: 'varchar', nullable: false })
  title: string;

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
  lightningNo: number;
}
