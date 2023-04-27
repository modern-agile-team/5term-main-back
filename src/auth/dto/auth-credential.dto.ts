import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/^[a-zA-Z0-9]*$/, {
    message: '아이디 규격을 확인하세요',
  })
  id: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/^.*(?=^.{4,20}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/, {
    message: '비밀번호 규격을 확인하세요',
  })
  password: string;

  @IsString()
  @MaxLength(13)
  @Matches(/^\d{3}-\d{3,4}-\d{4}$/, {
    message: '전화번호 규격이 틀립니다.',
  })
  phone: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  nickname: string;

  @IsString()
  @Matches(
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
    {
      message: '전화번호 규격이 틀립니다.',
    },
  )
  email: string;
}
