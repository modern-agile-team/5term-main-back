import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateStudyBoardDto {
  @ApiProperty({
    example: '모집글 제목 예시',
    description: 'title',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: '모집글 내용 예시',
    description: 'contents',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  contents: string;
}
