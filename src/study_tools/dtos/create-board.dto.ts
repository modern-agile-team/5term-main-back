import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty, IsString } from 'class-validator';

export class CreateBoardDto {
  @ApiProperty({
    example: '1',
    description: '스터디 아이디',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  study: number;

  @ApiProperty({
    example: '제목 예시',
    description: '게시글 제목',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: '내용 예시',
    description: '내용',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  content: string;
}
