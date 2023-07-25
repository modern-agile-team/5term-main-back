import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseFilters,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from '@src/common/exceptions/http-exception.filter';
import { SuccessInterceptor } from '@src/common/interceptors/success.interceptor';
import { StudyToolsTimetableService } from '@src/study_tools/services/study_tools_timetable.service';
import { GetUserId } from '@src/common/decorators/get-userId.decorator';
import { JwtAccessGuard } from '@src/config/guards/jwt-access-token.guard';
import { CreateTimetableDto } from '@src/study_tools/dtos/create-timetable.dto';
import { UpdateTimetableDto } from '@src/study_tools/dtos/update-timetable.dto';
import { StudyService } from '@src/study/service/study.service';

@ApiTags('study-timetables')
@UseFilters(HttpExceptionFilter)
@UseInterceptors(SuccessInterceptor)
@Controller('study-timetables')
export class StudyToolsTimetableController {
  constructor(
    private readonly studyService: StudyService,
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
    @Body() createTimetableDto: CreateTimetableDto,
  ) {
    const req = {
      study: createTimetableDto.study,
      writer: userId,
      schedule: createTimetableDto.schedule,
      content: createTimetableDto.content,
    };

    await this.studyService.checkAccess(req.writer, req.study);
    return await this.studyToolsTimetableService.createTimetable(req);
  }

  @ApiOperation({
    summary: '스터디 시간표 조회',
  })
  @UseGuards(JwtAccessGuard)
  @Get('/:studyId')
  async getTimetable(
    @GetUserId() userId: number,
    @Param('studyId', ParseIntPipe) studyId: number,
  ) {
    await this.studyService.checkAccess(userId, studyId);
    return await this.studyToolsTimetableService.getTimetable(studyId);
  }

  @ApiOperation({
    summary: ' 시간표 수정',
  })
  @UseGuards(JwtAccessGuard)
  @UsePipes(ValidationPipe)
  @Patch()
  async updateTimetable(
    @GetUserId() userId: number,
    @Body() updateTimetableDto: UpdateTimetableDto,
  ) {
    await this.studyToolsTimetableService.checkWriter(
      userId,
      updateTimetableDto.id,
    );

    return await this.studyToolsTimetableService.updateTimetable(
      updateTimetableDto,
    );
  }

  @ApiOperation({
    summary: ' 시간표 삭제',
  })
  @UseGuards(JwtAccessGuard)
  @UsePipes(ValidationPipe)
  @Delete('/:timetableId')
  async deleteTimetable(
    @GetUserId() userId: number,
    @Param('timetableId', ParseIntPipe) timetableId: number,
  ) {
    await this.studyToolsTimetableService.checkWriter(userId, timetableId);
    await this.studyToolsTimetableService.checkTimetable(timetableId);
    return await this.studyToolsTimetableService.deleteTimetable(timetableId);
  }
}
