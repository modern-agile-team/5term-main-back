import { IsBoolean, IsNotEmpty, IsDate, IsNumber } from 'class-validator';
import { CommonEntity } from 'src/common/entities/common.entity';
import { Column, Entity } from 'typeorm';

@Entity({
  name: 'lightning_info',
})
export class LightningInfoEntity extends CommonEntity {
  @IsNumber()
  @IsNotEmpty({ message: '활성여부를 입력해주세요' })
  @Column({ type: 'int', nullable: false,default: })
  active: number;

  @IsDate()
  @IsNotEmpty({ message: '만남 날짜를 입력해주세요' })
  @Column({ type: 'date', nullable: false })
  meeting_date: Date;
}
