import {
  BadRequestException,
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
import { StudyToolsBoardsService } from '../services/study_tools_boards.service';
import { S3Service } from 'src/s3/s3.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { JwtAccessGuard } from 'src/auth/guard/jwt-access-token.guard';
import { GetUserId } from 'src/common/decorator/getUserId.decorator';

@ApiTags('study-boards')
@UseFilters(HttpExceptionFilter)
@UseInterceptors(SuccessInterceptor)
@Controller('study-board')
export class StudyToolsBoardsController {
  constructor(
    private readonly studyToolsBoardsService: StudyToolsBoardsService,
    private readonly s3Service: S3Service,
  ) {}

  @ApiOperation({
    summary: '스터디 게시판 게시',
  })
  @UseGuards(JwtAccessGuard)
  @UseInterceptors(FilesInterceptor('files'))
  @Post()
  async createStudyToolsBoard(
    @GetUserId() userId: number,
    @UploadedFiles() files,
    @Body() body,
  ) {
    const boardInfo = await this.studyToolsBoardsService.createStudyBoard(
      userId,
      body,
    );
    const boardId = boardInfo[0].id;
    let fileNo = 0;
    for (const file of files) {
      const result = await this.s3Service.studyToolsBoardsImgUpload(
        file,
        boardId,
        fileNo,
      );
      const boardImg = this.studyToolsBoardsService.uploadImg(result, boardId);
      fileNo++;
    }

    return { boardInfo };
  }

  @ApiOperation({
    summary: '스터디 게시판 게시물 조회',
  })
  @UseGuards(JwtAccessGuard)
  @Get('/:studyId/:boardId')
  async getStudyToolsBoard(@GetUserId() userId, @Param() id) {
    const checkBoard = await this.studyToolsBoardsService.checkBoard(
      id.studyId,
      id.boardId,
    );
    if (checkBoard === false)
      throw new BadRequestException('존재하지않는 게시글');
    return await this.studyToolsBoardsService.getStudyToolsBoard(
      userId,
      id.studyId,
      id.boardId,
    );
  }

  @ApiOperation({
    summary: '스터디 게시판 게시물 목록 조회',
  })
  @UseGuards(JwtAccessGuard)
  @Get('/:studyId')
  async getStudyToolsBoardList(@GetUserId() userId, @Param() id) {
    return await this.studyToolsBoardsService.getStudyToolsBoardList(
      userId,
      id.studyId,
    );
  }

  @ApiOperation({
    summary: '스터디 게시판 수정',
  })
  @UseInterceptors(FilesInterceptor('files'))
  @UseGuards(JwtAccessGuard)
  @Patch('')
  async updateStudyToolsBoard(
    @GetUserId() userId,
    @Body() body,
    @UploadedFiles() files,
  ) {
    const checkBoard = await this.studyToolsBoardsService.checkBoard(
      body.studyId,
      body.boardId,
    );
    if (checkBoard === false)
      throw new BadRequestException('존재하지않는 게시글');
    const empty = await this.studyToolsBoardsService.deleteImg(body.boardId);

    let fileNo = 0;
    for (const file of files) {
      const result = await this.s3Service.studyToolsBoardsImgUpload(
        file,
        body.boardId,
        fileNo,
      );
      const boardImg = this.studyToolsBoardsService.uploadImg(
        result,
        body.boardId,
      );
      fileNo++;
    }

    return this.studyToolsBoardsService.updateStudyToolsBoard(userId, body);
  }

  @ApiOperation({
    summary: '스터디 모집글 삭제',
  })
  @UseGuards(JwtAccessGuard)
  @Delete('/:studyId/:boardid')
  async deleteStudyToolsBoard(@GetUserId() userId, @Param() id) {
    const checkBoard = await this.studyToolsBoardsService.checkBoard(
      id.studyId,
      id.boardId,
    );
    if (checkBoard === false)
      throw new BadRequestException('존재하지않는 게시글');
    return this.studyToolsBoardsService.deleteStudyToolsBoard(
      userId,
      id.boardId,
    );
  }

  @Post('test')
  test(@Body() id) {
    return this.studyToolsBoardsService.checkBoard(id.studyId, id.boardId);
  }
}
