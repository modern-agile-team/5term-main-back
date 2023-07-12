import {
  Body,
  Controller,
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

@ApiTags('study-tools-boards')
@UseFilters(HttpExceptionFilter)
@UseInterceptors(SuccessInterceptor)
@Controller('study-tools-boards')
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
  async createStudyBoard(
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
}
