import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { StudyService } from '../service/study.service';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { GetUserId } from 'src/common/decorator/getUserId.decorator';
import { JwtAccessGuard } from 'src/auth/guards/jwt-access-token.guard';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { StudyCreateDto } from '../dto/study.create.dto';

@ApiTags('study-management')
@Controller('study-management')
@UseFilters(HttpExceptionFilter)
@UseInterceptors(SuccessInterceptor)
export class StudyController {
  constructor(private studyService: StudyService) {}

  @ApiOperation({
    summary: '스터디 목록 조회',
    description: '모든 스터디의 목록을 리턴한다.',
  })
  @Get('/search')
  getStudyList() {
    return this.studyService.getStudyList();
  }

  @ApiOperation({
    summary: '스터디 상세 조회',
    description: '스터디 아이디를 받아서 스터디정보,관리자 정보를 리턴한다.',
  })
  @ApiParam({
    name: '스터디 id',
    example: '/studies/search/study-info/75',
    required: true,
  })
  @Get('/search/study-info/:id')
  getStudy(@Param('id') studyId: number) {
    return this.studyService.getStudy(studyId);
  }

  @ApiOperation({
    summary: '스터디 유저 조회',
    description: '스터디 아이디를 받고 해당하는 스터디의 멤버들을 리턴한다.',
  })
  @ApiParam({
    name: '스터디 id',
    example: '/studies/search/members/75',
    required: true,
  })
  @Get('/search/members/:id')
  getUser(@Param('id') studyId: number) {
    return this.studyService.getUsers(studyId);
  }

  @ApiOperation({
    summary: '유저의 스터디 조회',
    description:
      '유저의 아이디를 받아서 가입되어있는 스터디의 아이디를 리턴한다.',
  })
  @ApiParam({ name: '스터디 id', example: '/studies/75', required: true })
  @Get('/userid/:id')
  getUserStudy(@Param('id') userId: number) {
    return this.studyService.getUserStudy(userId);
  }

  @ApiOperation({
    summary: '스터디 생성기능',
    description: '스터디를 생성하고 생성한 유저는 관리자와 멤버로 들어간다',
  })
  @UseGuards(JwtAccessGuard)
  @Post('')
  createStudy(@GetUserId() userId, @Body() content: StudyCreateDto) {
    return this.studyService.createStudy(userId, content);
  }

  @ApiOperation({
    summary: '스터디 삭제기능',
    description:
      '삭제 하려는 유저가 관리자 권한이 있는지 확인하고 해당 스터디를 삭제한다. ',
  })
  @UseGuards(JwtAccessGuard)
  @Patch('')
  deleteStudy(@GetUserId() userId, @Body() study) {
    return this.studyService.deleteStudy(userId, study);
  }

  @ApiOperation({
    summary: '스터디 참여기능',
    description:
      '참여하는 유저의 아이디와 참여하려는 스터디의 아이디를 받아 멤버 테이블에 대기중 상태로 넣는다.',
  })
  @UseGuards(JwtAccessGuard)
  @Post('member')
  joinStudy(@GetUserId() userId, @Body() study) {
    return this.studyService.joinStudy(userId, study);
  }

  @ApiOperation({
    summary: '스터디 탈퇴기능',
    description:
      '탈퇴하려는 유저의 아이디와 스터디의 아이디를 받아 멤버 테이블에서 해당 열의 is_accept를 2로 변경한다. ',
  })
  @UseGuards(JwtAccessGuard)
  @Patch('member')
  exitStudy(@GetUserId() userId, @Body() study) {
    return this.studyService.exitStudy(userId, study);
  }

  @ApiOperation({
    summary: '스터디 추방기능',
    description:
      '추방할 유저의 아이디와 스터디의 아이디를 받아 멤버 테이블에서 해당 열의 is_accept를 2로 변경한다. ',
  })
  @UseGuards(JwtAccessGuard)
  @Patch('member/admin')
  expelStudy(@GetUserId() userId, @Body() req) {
    return this.studyService.expelStudy(userId, req);
  }

  @ApiOperation({
    summary: '스터디 가입요청 수락',
    description: '해당 스터디에 가입하려는 사람의 아이디를 받아 수락한다.',
  })
  @UseGuards(JwtAccessGuard)
  @Patch('admin')
  acceptStudy(@GetUserId() user, @Body() req) {
    return this.studyService.acceptStudy(user, req);
  }

  @ApiOperation({
    summary: '스터디 가입요청 거절',
    description: '스터디아이디와 가입요청한 유저의 아이디를 받아 거절한다.',
  })
  @UseGuards(JwtAccessGuard)
  @Delete('admin')
  rejectStudy(@GetUserId() userId, @Body() req) {
    return this.studyService.rejectStudy(userId, req);
  }

  @ApiOperation({
    summary: '스터디 관리자 권한 양도',
    description: '스터디 관리자 권한을 다른 멤버에게 양도한다.',
  })
  @UseGuards(JwtAccessGuard)
  @Patch('admin/transfer-admin')
  transferAdmin(@GetUserId() userId, @Body() req) {
    return this.studyService.transferAdmin(userId, req);
  }
}
