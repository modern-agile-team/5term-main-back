import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ChangeBioDto {
  @IsString()
  @ApiProperty({
    name: 'bio',
    description: '자기소개',
    example: '안녕하세요 홍길동입니다.',
  })
  bio: string;
}
