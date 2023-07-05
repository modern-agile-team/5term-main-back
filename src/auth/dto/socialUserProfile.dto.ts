import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class SocialUserProfileDto {
  @IsString()
  @MaxLength(13)
  @ApiProperty({
    name: 'phone',
    description: '전화번호',
    example: '01012345678',
  })
  phone: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @ApiProperty({
    name: 'nickname',
    description: '닉네임',
    example: '닉네임123',
  })
  nickname: string;

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

  @IsString()
  @MinLength(2)
  @ApiProperty({
    name: 'name',
    description: '이름',
    example: '홍길동',
  })
  name: string;
}
