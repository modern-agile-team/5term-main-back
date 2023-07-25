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
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from '@src/common/exceptions/http-exception.filter';
import { SuccessInterceptor } from '@src/common/interceptors/success.interceptor';
import { StudyToolsBoardsService } from '@src/study_tools/services/study_tools_boards.service';
// import { S3Service } from 'src/s3/s3.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { JwtAccessGuard } from '@src/config/guards/jwt-access-token.guard';
import { GetUserId } from '@src/common/decorators/get-userId.decorator';
import { CreateBoardDto } from '@src/study_tools/dtos/create-board.dto';
import { UpdateBoardDto } from '@src/study_tools/dtos/update-board.dto';
import { StudyService } from '@src/study/service/study.service';
import { S3Service } from '@src/common/s3/s3.service';

@ApiTags('study-boards')
@UseFilters(HttpExceptionFilter)
@UseInterceptors(SuccessInterceptor)
@Controller('study-boards')
export class StudyToolsBoardsController {
  constructor(
    private readonly studyToolsBoardsService: StudyToolsBoardsService,
    private readonly s3Service: S3Service,
    private readonly studyService: StudyService,
  ) {}

  @ApiOperation({
    summary: '스터디 게시판 게시',
  })
  @UseGuards(JwtAccessGuard)
  @UsePipes(ValidationPipe)
  @UseInterceptors(FilesInterceptor('files'))
  @Post()
  async createStudyToolsBoard(
    @GetUserId() userId: number,
    @UploadedFiles() files,
    @Body() createBoardDto: CreateBoardDto,
  ) {
    await this.studyService.checkAccess(userId, createBoardDto.study);
    const boardInfo = await this.studyToolsBoardsService.createStudyBoard(
      userId,
      createBoardDto,
    );

    const boardId = boardInfo[0].id;
    let fileNo = 0;
    for (const file of files) {
      const param = `main-studyToolsBoards/boardId:${boardId}/${fileNo}`;
      const result = await this.s3Service.imgUpload(file, param);
      this.studyToolsBoardsService.uploadImg(result, boardId);
      fileNo++;
    }

    return { boardInfo };
  }

  @ApiOperation({
    summary: '스터디 게시판 게시물 조회',
  })
  @UseGuards(JwtAccessGuard)
  @Get('/:studyId/:boardId')
  async getStudyToolsBoard(
    @GetUserId() userId: number,
    @Param('studyId', ParseIntPipe) studyId: number,
    @Param('boardId', ParseIntPipe) boardId: number,
  ) {
    await this.studyService.checkAccess(userId, studyId);
    await this.studyToolsBoardsService.checkBoard(boardId);
    return await this.studyToolsBoardsService.getStudyToolsBoard(
      studyId,
      boardId,
    );
  }

  @ApiOperation({
    summary: '스터디 게시판 게시물 목록 조회',
  })
  @UseGuards(JwtAccessGuard)
  @Get('/:studyId')
  async getStudyToolsBoardList(
    @GetUserId() userId: number,
    @Param('studyId', ParseIntPipe) studyId: number,
  ) {
    await this.studyService.checkAccess(userId, studyId);
    return await this.studyToolsBoardsService.getStudyToolsBoardList(studyId);
  }

  @ApiOperation({
    summary: '스터디 게시판 수정',
  })
  @UseGuards(JwtAccessGuard)
  @UsePipes(ValidationPipe)
  @UseInterceptors(FilesInterceptor('files'))
  @Patch()
  async updateStudyToolsBoard(
    @GetUserId() userId: number,
    @UploadedFiles() files,
    @Body() updateBoardDto: UpdateBoardDto,
  ) {
    await this.studyService.checkAccess(userId, updateBoardDto.study);
    await this.studyToolsBoardsService.checkBoard(updateBoardDto.boardId);
    await this.studyToolsBoardsService.deleteImg(updateBoardDto.boardId);

    const boardId = updateBoardDto.boardId;
    let fileNo = 0;
    for (const file of files) {
      const param = `main-studyToolsBoards/boardId:${boardId}/${fileNo}`;
      const result = await this.s3Service.imgUpload(file, param);
      this.studyToolsBoardsService.uploadImg(result, boardId);
      fileNo++;
    }
    return this.studyToolsBoardsService.updateStudyToolsBoard(updateBoardDto);
  }

  @ApiOperation({
    summary: '스터디 게시글 삭제',
  })
  @UseGuards(JwtAccessGuard)
  @Delete('/:studyId/:boardId')
  async deleteStudyToolsBoard(
    @GetUserId() userId: number,
    @Param('studyId', ParseIntPipe) studyId: number,
    @Param('boardId', ParseIntPipe) boardId: number,
  ) {
    await this.studyService.checkAccess(userId, studyId);
    await this.studyToolsBoardsService.checkBoard(boardId);
    await this.studyToolsBoardsService.deleteImg(boardId);
    return this.studyToolsBoardsService.deleteStudyToolsBoard(boardId);
  }
}
