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
import { JwtAccessGuard } from 'src/auth/guard/jwt-access-token.guard';
import { GetUserId } from 'src/common/decorator/getUserId.decorator';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { CreateCalendarDto } from '../dtos/create-calendar.dto';
import { StudyToolsCalendarService } from '../services/study_tools_calendar.service';
import { StudyToolsTimetableService } from '../services/study_tools_timetable.service';

@ApiTags('study-calendar')
@UseFilters(HttpExceptionFilter)
@UseInterceptors(SuccessInterceptor)
@Controller('study-calendar')
export class StudyToolsCalendarController {
  constructor(
    private readonly studyToolsTimetableService: StudyToolsTimetableService,
    private readonly studyToolsCalendarService: StudyToolsCalendarService,
  ) {}
  @ApiOperation({
    summary: '일정 생성',
  })
  @UseGuards(JwtAccessGuard)
  @UsePipes(ValidationPipe)
  @Post()
  async createCalendar(
    @GetUserId() userId: number,
    @Body() createCalendar: CreateCalendarDto,
  ) {
    const req = {
      study: Number(createCalendar.study),
      writer: userId,
      date: createCalendar.date,
      content: createCalendar.content,
    };
    const checkAccess = await this.studyToolsTimetableService.checkAccess(
      req.writer,
      req.study,
    );
    if (!!checkAccess[0] === false)
      throw new BadRequestException('작성권한 없음');

    return await this.studyToolsCalendarService.createCalendar(req);
  }

  @ApiOperation({
    summary: '일정 조회',
  })
  @UseGuards(JwtAccessGuard)
  @Get('/:studyId')
  async getCalendar(@GetUserId() userId: number, @Param() id) {
    const checkAccess = await this.studyToolsTimetableService.checkAccess(
      userId,
      id.studyId,
    );
    if (!!checkAccess[0] === false)
      throw new BadRequestException('작성권한 없음');

    return await this.studyToolsCalendarService.getCalendar(id.studyId);
  }
}
