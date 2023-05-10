import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty } from 'class-validator';
export class CreateLightningInfoDto {
  @ApiProperty({
    example: '2023-05-04',
    description: '만나는 날짜',
    required: true,
  })
  @IsDate()
  @IsNotEmpty({ message: '만남 날짜를 입력해주세요' })
  meetingDate: Date;
}
