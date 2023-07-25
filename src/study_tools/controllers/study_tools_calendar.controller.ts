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
import { CreateCalendarDto } from '@src/study_tools/dtos/create-calendar.dto';
import { StudyToolsCalendarService } from '@src/study_tools/services/study_tools_calendar.service';
import { UpdateCalendarDto } from '@src/study_tools/dtos/update-calendar.dto';
import { StudyService } from '@src/study/service/study.service';
import { JwtAccessGuard } from '@src/config/guards/jwt-access-token.guard';
import { GetUserId } from '@src/common/decorators/get-userId.decorator';

@ApiTags('study-calendars')
@UseFilters(HttpExceptionFilter)
@UseInterceptors(SuccessInterceptor)
@Controller('study-calendars')
export class StudyToolsCalendarController {
  constructor(
    private readonly studyToolsCalendarService: StudyToolsCalendarService,
    private readonly studyService: StudyService,
  ) {}
  @ApiOperation({
    summary: '일정 생성',
  })
  @UseGuards(JwtAccessGuard)
  @UsePipes(ValidationPipe)
  @Post()
  async createCalendar(
    @GetUserId() userId: number,
    @Body() createCalendarDto: CreateCalendarDto,
  ) {
    const req = {
      ...createCalendarDto,
      writer: userId,
    };
    await this.studyService.checkAccess(req.writer, req.study);
    return await this.studyToolsCalendarService.createCalendar(req);
  }

  @ApiOperation({
    summary: '일정 조회',
  })
  @UseGuards(JwtAccessGuard)
  @Get('/:studyId')
  async getCalendar(
    @GetUserId() userId: number,
    @Param('studyId', ParseIntPipe) studyId: number,
  ) {
    await this.studyService.checkAccess(userId, studyId);

    return await this.studyToolsCalendarService.getCalendar(studyId);
  }

  @ApiOperation({
    summary: '일정 수정',
  })
  @UseGuards(JwtAccessGuard)
  @UsePipes(ValidationPipe)
  @Patch()
  async updateCalendar(
    @GetUserId() userId: number,
    @Body() updateCalendarDto: UpdateCalendarDto,
  ) {
    await this.studyToolsCalendarService.checkWriter(
      userId,
      updateCalendarDto.id,
    );
    return await this.studyToolsCalendarService.updateCalendar(
      updateCalendarDto,
    );
  }

  @ApiOperation({
    summary: '일정 삭제',
  })
  @UseGuards(JwtAccessGuard)
  @UsePipes(ValidationPipe)
  @Delete('/:calendarId')
  async deleteCalendar(
    @GetUserId() userId: number,
    @Param('calendarId', ParseIntPipe) calendarId: number,
  ) {
    await this.studyToolsCalendarService.checkCalendar(calendarId);
    await this.studyToolsCalendarService.checkWriter(userId, calendarId);

    return await this.studyToolsCalendarService.deleteCalendar(calendarId);
  }
}
