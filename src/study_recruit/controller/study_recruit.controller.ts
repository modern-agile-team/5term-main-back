import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFiles,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { StudyRecruitService } from '../service/study_recruit.service';
import { JwtAccessGuard } from 'src/auth/guard/jwt-access-token.guard';
import { GetUserId } from 'src/common/decorator/getUserId.decorator';
import { UpdateStudyBoardDto } from '../dto/update-study-board-dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { S3Service } from 'src/s3/s3.service';

@ApiTags('study-recruitment')
@Controller('study-recruit')
@UseFilters(HttpExceptionFilter)
@UseInterceptors(SuccessInterceptor)
export class StudyRecruitController {
  constructor(
    private readonly studyRecruitService: StudyRecruitService,
    private readonly s3Service: S3Service,
  ) {}

  @ApiOperation({
    summary: '스터디 모집글 게시',
  })
  @UseGuards(JwtAccessGuard)
  @UseInterceptors(FilesInterceptor('files'))
  @Post()
  async createStudyRecruitBoard(
    @GetUserId() userId: number,
    @UploadedFiles() files,
    @Body() createStudyBoardDto,
  ) {
    const boardInfo = await this.studyRecruitService.createStudyRecruitBoard(
      userId,
      createStudyBoardDto,
    );
    const boardId = boardInfo[0].id;
    for (const file of files) {
      const result = await this.s3Service.studyRecruitImgUpload(file, boardId);
      const boardImg = this.studyRecruitService.uploadImg(result, boardId);
    }

    return { boardInfo };
  }

  @ApiOperation({
    summary: '스터디 모집글 조회',
  })
  @Get('/:id')
  getStudyRecruitBoard(@Param() board) {
    try {
      return this.studyRecruitService.getStudyRecruitBoard(board.id);
    } catch (error) {
      throw new error('스터디 모집글 조회 실패');
    }
  }

  @ApiOperation({
    summary: '스터디 모집글 목록 조회',
  })
  @Get('')
  getStudyRecruitBoardList() {
    try {
      return this.studyRecruitService.getStudyRecruitBoardList();
    } catch (error) {
      throw new error('스터디 모집글 목록 조회 실패');
    }
  }

  @ApiOperation({
    summary: '스터디 모집글 수정',
  })
  @UseGuards(JwtAccessGuard)
  @Patch('')
  updateStudyRecruitBoard(
    @GetUserId() userId,
    @Body() updateStudyBoardDto: UpdateStudyBoardDto,
  ) {
    return this.studyRecruitService.updateStudyRecruitBoard(
      userId,
      updateStudyBoardDto,
    );
  }

  @ApiOperation({
    summary: '스터디 모집글 삭제',
  })
  @UseGuards(JwtAccessGuard)
  @Delete('/:id')
  deleteStudyRecruitBoard(@GetUserId() userId, @Param('id') boardId) {
    return this.studyRecruitService.deleteStudyRecruitBoard(userId, boardId);
  }
}
