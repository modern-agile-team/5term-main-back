import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { StudyRecruitService } from '../service/study_recruit.service';
import { CreateStudyBoardDto } from '../dto/create-study-board-dto';
import { JwtAccessGuard } from 'src/auth/guard/jwt-access-token.guard';
import { GetUserId } from 'src/common/decorator/getUserId.decorator';

@ApiTags('study-recruitment')
@Controller('study-recruit')
@UseFilters(HttpExceptionFilter)
@UseInterceptors(SuccessInterceptor)
export class StudyRecruitController {
  constructor(private readonly studyRecruitService: StudyRecruitService) {}

  @ApiOperation({
    summary: '스터디 모집글 게시',
  })
  @UseGuards(JwtAccessGuard)
  @Post()
  async createStudyRecruitBoard(
    @GetUserId() userId: number,
    @Body() createStudyBoardDto: CreateStudyBoardDto,
  ) {
    return await this.studyRecruitService.createStudyRecruitBoard(
      userId,
      createStudyBoardDto,
    );
  }

  @ApiOperation({
    summary: '스터디 모집글 조회',
  })
  @Get('/:id')
  getStudyRecruitBoard(@Param() board) {
    return this.studyRecruitService.getStudyRecruitBoard(board.id);
  }

  // @ApiOperation({
  //   summary: '스터디 모집글 목록 조회',
  // })
  // @Get('/list')
  // getStudyRecruitBoardList(){
  //   return this.studyRecruitService.getStudyRecruitBoardList()
  // }
}
