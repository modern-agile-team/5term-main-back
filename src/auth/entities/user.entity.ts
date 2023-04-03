import { IsNotEmpty } from 'class-validator';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @IsNotEmpty()
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column()
  login_type: number;
}
