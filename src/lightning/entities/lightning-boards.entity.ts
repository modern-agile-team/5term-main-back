import { User } from '@src/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { LightningInfoEntity } from '@src/lightning/entities/lightning-info.entity';
import { CommonEntity } from '@src/common/entities/common.entity';

@Entity({
  name: 'lightning_recruitment_boards',
})
export class LightningBoardEntity extends CommonEntity {
  @Column({ type: 'varchar', nullable: false })
  title: string;

  @Column({ type: 'text', nullable: true })
  contents: string;

  @Column({ type: 'int', nullable: false })
  author_id: number;

  @Column({ type: 'int', nullable: false })
  lightning_id: number;

  @ManyToOne(() => User, (author: User) => author.lightningBoard, {
    onDelete: 'CASCADE',
  })
  @JoinColumn([
    {
      name: 'author_id',
      referencedColumnName: 'id',
    },
  ])
  author: User;

  @ManyToOne(
    () => LightningInfoEntity,
    (lightningNo: LightningInfoEntity) => lightningNo.id,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn([
    {
      name: 'lightning_id',
      referencedColumnName: 'id',
    },
  ])
  lightningNo: LightningInfoEntity;
}
