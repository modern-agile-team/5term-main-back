import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
export class RequestLightningDto {
  @ApiProperty({
    example: '1',
    description: '모임 번호',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty({ message: '번개 모임 번호를 넣어주세요' })
  lightningNo: number;
}
