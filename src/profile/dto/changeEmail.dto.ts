import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches } from 'class-validator';

export class ChangeEmailDto {
  @IsString()
  @ApiProperty({
    name: 'email',
    description: '이메일',
    example: 'test@email.com',
  })
  @Matches(
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
    {
      message: '이메일 규격이 틀립니다.',
    },
  )
  email?: string;
}
