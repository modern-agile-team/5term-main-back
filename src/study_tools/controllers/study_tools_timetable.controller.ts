import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseFilters,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { StudyToolsTimetableService } from '../services/study_tools_timetable.service';
import { GetUserId } from 'src/common/decorator/getUserId.decorator';
import { JwtAccessGuard } from 'src/auth/guard/jwt-access-token.guard';
import { CreateTimetableDto } from '../dtos/create-timetable.dto';

@ApiTags('study-tools/timetable')
@UseFilters(HttpExceptionFilter)
@UseInterceptors(SuccessInterceptor)
@Controller('study-tools/timetable')
export class StudyToolsTimetableController {
  constructor(
    private readonly studyToolsTimetableService: StudyToolsTimetableService,
  ) {}

  @ApiOperation({
    summary: '새 시간표 작성',
  })
  @UseGuards(JwtAccessGuard)
  @UsePipes(ValidationPipe)
  @Post()
  async createTimetable(
    @GetUserId() userId: number,
    @Body() body: CreateTimetableDto,
  ) {
    const req = {
      study: body.study,
      writer: userId,
      schedule: body.schedule,
      content: body.content,
    };

    const checkAccess = await this.studyToolsTimetableService.checkAccess(
      req.writer,
      req.study,
    );
    if (!!checkAccess[0] === false)
      throw new BadRequestException('작성권한 없음');

    return await this.studyToolsTimetableService.createTimetable(req);
  }

  @ApiOperation({
    summary: '스터디 시간표 조회',
  })
  @UseGuards(JwtAccessGuard)
  @Get('/:studyId')
  async getTimetable(@GetUserId() userId: number, @Param() studyId) {
    const checkAccess = await this.studyToolsTimetableService.checkAccess(
      userId,
      studyId.studyId,
    );
    if (!!checkAccess[0] === false)
      throw new BadRequestException('조회권한 없음');

    return await this.studyToolsTimetableService.getTimetable(studyId.studyId);
  }
}
