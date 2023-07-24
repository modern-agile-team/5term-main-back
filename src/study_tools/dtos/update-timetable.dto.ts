import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateTimetableDto } from './create-timetable.dto';

export class UpdateTimetableDto extends CreateTimetableDto {
  @ApiProperty({
    example: '5',
    description: '시간표 아이디',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
