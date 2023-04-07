import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
