import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class ChangePhoneDto {
  @IsString()
  @MaxLength(13)
  @ApiProperty({
    name: 'phone',
    description: '전화번호',
    example: '01012345678',
  })
  phone: string;
}
