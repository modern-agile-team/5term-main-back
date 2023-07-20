import { IsNumber } from 'class-validator';

export class SmsCertificationDto {
  @IsNumber()
  phoneNumber: number;
}
