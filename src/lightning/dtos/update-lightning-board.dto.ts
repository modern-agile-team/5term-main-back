import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
export class UpdateLightningBoardDto {
  @ApiProperty({
    example: '현준이형 똥멍청이',
    description: 'title',
  })
  @IsString()
  title: string;

  @ApiProperty({
    example: 'swagger 안만들어주면 아무고토 못하죠?',
    description: 'contents',
  })
  @IsString()
  contents: string;
}
