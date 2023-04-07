import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class StudyboardIMG extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  imgUrl: string;

  @Column()
  imgKey: string;
}
