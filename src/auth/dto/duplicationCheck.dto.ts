import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class IdDuplicationCheckDto {
  @IsString()
  @IsNotEmpty()
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
}

export class NicknameDuplicationCheckDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @ApiProperty({
    name: 'nickname',
    description: '닉네임',
    example: '닉네임123',
  })
  nickname: string;
}

export class PhoneDuplicationCheckDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(11)
  @ApiProperty({
    name: 'phoneNumber',
    description: '전화번호',
    example: '01012345678',
  })
  phoneNumber: string;
}
