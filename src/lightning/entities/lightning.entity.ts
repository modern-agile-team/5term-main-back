import {
  IsBoolean,
  IsNotEmpty,
  IsDate,
  IsNumber,
  IsString,
} from 'class-validator';
import { CommonEntity } from 'src/common/entities/common.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'lightning_info',
})
export class LightningInfoEntity extends CommonEntity {
  @IsBoolean()
  @IsNotEmpty({ message: '활성여부를 입력해주세요' })
  @Column({ type: 'boolean', nullable: false })
  active: boolean;

  @IsDate()
  @IsNotEmpty({ message: '만남 날짜를 입력해주세요' })
  @Column({ type: 'date', nullable: false })
  meeting_date: Date;
}

@Entity({
  name: 'lightning_recruitment_boards',
})
export class LightningBoardEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNumber()
  @IsNotEmpty()
  @Column({ type: 'int', nullable: false })
  writer_id: number;

  @IsString()
  @IsNotEmpty({ message: '제목을 입력해주세요' })
  @Column({ type: 'varchar', nullable: false })
  title: string;

  @IsString()
  @IsNotEmpty({ message: '내용을 입력해주세요' })
  @Column({ type: 'text', nullable: true })
  contents: string;
}
