import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class LoginDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @ApiProperty({
    name: 'id',
    description: '아이디',
    example: 'id123',
  })
  @Matches(/^[a-zA-Z0-9]*$/, {
    message: '아이디 규격을 확인하세요',
  })
  id: string;

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
