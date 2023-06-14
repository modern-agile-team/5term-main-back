import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateLightningToUserDto {
  @ApiProperty({
    example: '0',
    description: '관리자 = 1 구성원 = 0',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  isAdmin: number;
}
