import { IsNotEmpty, IsDate, IsNumber } from 'class-validator';
import { CommonEntity } from 'src/common/entities/common.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToMany } from 'typeorm';

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
}
