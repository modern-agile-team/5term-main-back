import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFiles,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from '@src/common/exceptions/http-exception.filter';
import { SuccessInterceptor } from '@src/common/interceptors/success.interceptor';
import { StudyRecruitService } from '@src/study/services/study_recruit.service';
import { JwtAccessGuard } from '@src/config/guards/jwt-access-token.guard';
import { GetUserId } from '@src/common/decorators/get-userId.decorator';
import { FilesInterceptor } from '@nestjs/platform-express';
import { S3Service } from '@src/common/s3/s3.service';
import { CreateStudyRecruitBoardDto } from '@src/study/dtos/create-recruit-board.dto';
import { UpdateStudyRecruitBoardDto } from '@src/study/dtos/update-recruit-board.dto';

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
    @Body() createStudyBoardDto: CreateStudyRecruitBoardDto,
  ) {
    const boardInfo = await this.studyRecruitService.createStudyRecruitBoard(
      userId,
      createStudyBoardDto,
    );
    const boardId = boardInfo[0].id;
    let fileNo = 0;
    for (const file of files) {
      const param = `main-studyRecruitBoard/boardId:${boardId}/${fileNo}`;
      const result = await this.s3Service.imgUpload(file, param);
      this.studyRecruitService.uploadImg(result, boardId);
      fileNo++;
    }

    return { boardInfo };
  }

  @ApiOperation({
    summary: '스터디 모집글 목록 조회',
  })
  @Get('')
  getStudyRecruitBoardList() {
    return this.studyRecruitService.getStudyRecruitBoardList();
  }

  @ApiOperation({
    summary: '스터디 모집글 조회',
  })
  @Get('/:boardId')
  async getStudyRecruitBoard(@Param('boardId', ParseIntPipe) boardId: number) {
    const boardInfo = await this.studyRecruitService.getStudyRecruitBoard(
      boardId,
    );
    const boardImg = await this.studyRecruitService.getImg(boardId);
    return [boardInfo, boardImg];
  }

  @ApiOperation({
    summary: '스터디 모집글 수정',
  })
  @UseInterceptors(FilesInterceptor('files'))
  @UseGuards(JwtAccessGuard)
  @Patch()
  async updateStudyRecruitBoard(
    @GetUserId() userId: number,
    @Body() updateStudyRecruitBoardDto: UpdateStudyRecruitBoardDto,
    @UploadedFiles() files,
  ) {
    await this.studyRecruitService.deleteImg(
      updateStudyRecruitBoardDto.boardId,
    );
    const boardId = updateStudyRecruitBoardDto.boardId;
    let fileNo = 0;
    for (const file of files) {
      const param = `main-studyRecruitBoard/boardId:${boardId}/${fileNo}`;
      const result = await this.s3Service.imgUpload(file, param);
      this.studyRecruitService.uploadImg(result, boardId);
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
  @Delete('/:boardId')
  deleteStudyRecruitBoard(
    @GetUserId() userId: number,
    @Param('boardId', ParseIntPipe) boardId: number,
  ) {
    return this.studyRecruitService.deleteStudyRecruitBoard(userId, boardId);
  }
}
