import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateTimetableDto } from '@src/study_tools/dtos/create-timetable.dto';

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
