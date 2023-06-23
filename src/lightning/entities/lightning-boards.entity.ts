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

  @Column({ type: 'int', nullable: false })
  authorId: number;

  @Column({ type: 'int', nullable: false })
  lightningId: number;

  @ManyToOne(() => User, (author: User) => author.lightningBoard, {
    onDelete: 'CASCADE',
  })
  @JoinColumn([
    {
      name: 'authorId',
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
      name: 'lightningId',
      referencedColumnName: 'id',
    },
  ])
  lightningNo: LightningInfoEntity;
}
