import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Schedule } from '@src/user/types/schedule.enum';

export class CreateTimetableDto {
  @ApiProperty({
    example: '1',
    description: '스터디 아이디',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  study: number;

  @ApiProperty({
    example: 'TUE13-14',
    description: '요일 및 시간',
    required: true,
  })
  @IsEnum(Schedule, { message: '올바른 스케줄 값을 입력해주세요.' })
  @IsNotEmpty()
  schedule: Schedule;

  @ApiProperty({
    example: '일정',
    description: '내용',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  content: string;
}
