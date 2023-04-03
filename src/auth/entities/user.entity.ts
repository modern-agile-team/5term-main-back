import { IsNotEmpty } from 'class-validator';
import { CommonEntity } from 'src/common/entities/common.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class User extends CommonEntity {
  @IsNotEmpty()
  @Column()
  login_type: number;
}
