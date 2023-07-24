import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty, IsString } from 'class-validator';
import { CreateBoardDto } from './create-board.dto';

export class UpdateBoardDto extends CreateBoardDto {
  @ApiProperty({
    example: '1',
    description: '게시물 아이디',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  boardId: number;
}
