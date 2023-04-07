import { IsNotEmpty } from 'class-validator';
import { CommonEntity } from 'src/common/entities/common.entity';
import { LightningBoardEntity } from 'src/lightning/entities/lightning-boards.entity';
import { LightningInfoEntity } from 'src/lightning/entities/lightning-info.entity';
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';

@Entity()
export class User extends CommonEntity {
  @IsNotEmpty()
  @Column()
  login_type: number;

  @Column()
  user_id: string;

  @ManyToMany(
    () => LightningInfoEntity,
    (lightningInfo: LightningInfoEntity) => lightningInfo.id,
    {
      cascade: true,
    },
  )
  @JoinTable({
    name: 'lightning_members',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'lightning_id',
      referencedColumnName: 'id',
    },
  })
  @OneToMany(
    () => LightningBoardEntity,
    (lightningBoard: LightningBoardEntity) => lightningBoard.author,
    {
      cascade: true,
    },
  )
  lightningBoard: LightningBoardEntity[];
}
