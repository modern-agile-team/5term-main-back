import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @ApiProperty({
    name: 'password',
    description: '비밀번호',
    example: '1234',
  })
  password: string;
}
