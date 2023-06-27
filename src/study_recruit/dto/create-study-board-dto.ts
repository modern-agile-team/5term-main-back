import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty, IsString } from 'class-validator';
import { Study } from 'src/study/entities/study.entity';

export class CreateStudyBoardDto {
  @ApiProperty({
    example: '모집글 제목 예시',
    description: 'title',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: '100',
    description: '스터디',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  studyId: Study;

  @ApiProperty({
    example: '모집글 내용 예시',
    description: 'contents',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  contents: string;
}