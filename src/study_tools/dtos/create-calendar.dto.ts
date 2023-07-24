import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty, IsString } from 'class-validator';
import { Study } from 'src/study/entities/study.entity';

export class CreateCalendarDto {
  @ApiProperty({
    example: '1',
    description: '스터디 아이디',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  study: Study;

  @ApiProperty({
    example: '',
    description: '날짜',
    required: true,
  })
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
