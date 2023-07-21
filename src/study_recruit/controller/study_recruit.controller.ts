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
import { JwtAccessGuard } from 'src/config/guards/jwt-access-token.guard';
import { GetUserId } from 'src/common/decorators/get-userId.decorator';
import { FilesInterceptor } from '@nestjs/platform-express';
import { S3Service } from 'src/common/s3/s3.service';

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
    let fileNo = 0;
    for (const file of files) {
      const result = await this.s3Service.studyRecruitImgUpload(
        file,
        boardId,
        fileNo,
      );
      const boardImg = this.studyRecruitService.uploadImg(result, boardId);
      fileNo++;
    }

    return { boardInfo };
  }

  @ApiOperation({
    summary: '스터디 모집글 조회',
  })
  @Get('/:id')
  async getStudyRecruitBoard(@Param() board) {
    const boardInfo = await this.studyRecruitService.getStudyRecruitBoard(
      board.id,
    );
    const boardImg = await this.studyRecruitService.getImg(board.id);
    return [boardInfo, boardImg];
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
  @UseInterceptors(FilesInterceptor('files'))
  @UseGuards(JwtAccessGuard)
  @Patch('')
  async updateStudyRecruitBoard(
    @GetUserId() userId,
    @Body() updateStudyRecruitBoardDto,
    @UploadedFiles() files,
  ) {
    const empty = await this.studyRecruitService.deleteImg(
      updateStudyRecruitBoardDto.boardId,
    );

    let fileNo = 0;
    for (const file of files) {
      const result = await this.s3Service.studyRecruitImgUpload(
        file,
        updateStudyRecruitBoardDto.boardId,
        fileNo,
      );
      const boardImg = this.studyRecruitService.uploadImg(
        result,
        updateStudyRecruitBoardDto.boardId,
      );
      fileNo++;
    }

    return this.studyRecruitService.updateStudyRecruitBoard(
      userId,
      updateStudyRecruitBoardDto,
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
