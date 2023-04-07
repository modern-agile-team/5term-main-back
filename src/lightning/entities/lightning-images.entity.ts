import { IsNumber, IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'lightning_board_images',
})
export class LightningImagesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNumber()
  @Column({ name: 'lightning_board_id' })
  lightningBoardId: number;

  @IsString()
  @Column({ name: 'img_url' })
  imgUrl: string;

  @IsString()
  @Column({ name: 'img_key' })
  imgKey: string;
}
