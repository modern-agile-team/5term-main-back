import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateStudyRecruitBoardDto {
  @ApiProperty({
    example: '제목 예시',
    description: '제목',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: '1',
    description: '스터디 아이디',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  studyId: number;
  @ApiProperty({
    example: '제목 예시',
    description: '제목',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  contents: string;
}
