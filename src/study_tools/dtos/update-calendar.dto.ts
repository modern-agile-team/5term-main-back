import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateCalendarDto } from './create-calendar.dto';

export class UpdateCalendarDto extends CreateCalendarDto {
  @ApiProperty({
    example: '5',
    description: '시간표 아이디',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
