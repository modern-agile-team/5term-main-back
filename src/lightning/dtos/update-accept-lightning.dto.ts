import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateAcceptLightningDto {
  @ApiProperty({
    example: '1',
    description: '수락 대기중 = 0 수락 = 1 거절 = 2',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  isAccept: 1 | 2;
}
