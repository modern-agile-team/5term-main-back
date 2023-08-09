import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty } from 'class-validator';
import { CreateBoardDto } from '@src/study/dtos/create-board.dto';

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
