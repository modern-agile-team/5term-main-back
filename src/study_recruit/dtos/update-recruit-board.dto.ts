import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateStudyRecruitBoardDto {
  @IsNumber()
  @IsNotEmpty()
  boardId: number;

  @ApiProperty({
    example: '제목 예시',
    description: '제목',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: '제목 예시',
    description: '제목',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  contents: string;
}
