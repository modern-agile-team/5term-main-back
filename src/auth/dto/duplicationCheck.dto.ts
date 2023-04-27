import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class DuplicationCheckDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/^[a-zA-Z0-9]*$/, {
    message: '아이디 규격을 확인하세요',
  })
  id?: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  nickname?: string;
}
