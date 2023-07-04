import { User } from 'src/user/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateLightningBoardDto {
  @ApiProperty({
    example: '1',
    description: '글쓴이',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  authorId: number;

  @ApiProperty({
    example: '현준이형 때릴 사람 구함',
    description: 'title',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: '5월 4일 현준이형 능지처참할 인원 구함',
    description: 'contents',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  contents: string;
}
