import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'lightning_board_images',
})
export class LightningImagesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'lightning_board_id' })
  lightningBoardId: number;

  @Column({ name: 'img_url' })
  imgUrl: string;

  @Column({ name: 'img_key' })
  imgKey: string;
}
