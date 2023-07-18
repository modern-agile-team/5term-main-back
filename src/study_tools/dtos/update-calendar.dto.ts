import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateCalendarDto {
  @ApiProperty({
    example: '1',
    description: '스터디 아이디',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  study: number;

  @ApiProperty({
    example: '5',
    description: '시간표 아이디',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @ApiProperty({
    example: 'TUE13-14',
    description: '요일 및 시간',
    required: true,
  })
  @IsDate()
  @IsNotEmpty()
  date: Date;

  @ApiProperty({
    example: '일정',
    description: '내용',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  content: string;
}
