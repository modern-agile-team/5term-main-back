import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { StudyService } from '../service/study.service';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { StudiesQueryDto } from '../studis-query-dto';
import { GetUserId } from 'src/common/decorator/get-user-id.decorator';
import { JwtAccessGuard } from 'src/auth/guard/jwt-access-token.guard';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';

@ApiTags('studies')
@Controller('studies')
@UseFilters(HttpExceptionFilter)
@UseInterceptors(SuccessInterceptor)
export class StudyController {
  constructor(private studysService: StudyService) {}

  @ApiOperation({
    summary: '스터디 조회',
    description:
      'url에 변수를 넣으면 검색조건에 해당하는 스터디만 뽑아온다(없으면 모든 스터디 리턴)',
  })
  @ApiParam({ name: '검색 조건', example: '/studies/82?active=true' })
  @Get('')
  getStudyList(@Query() studisQueryDto: StudiesQueryDto) {
    return this.studysService.getStudyList(studisQueryDto);
  }

  @ApiOperation({
    summary: '스터디 상세 조회',
    description:
      '스터디 아이디를 받아서 스터디정보,관리자 멤버 정보를 리턴한다.',
  })
  @ApiParam({ name: '스터디 id', example: '/studies?id=10', required: true })
  @Get(':id')
  getStudy(@Param('id') studyId: number) {
    return this.studysService.getStudy(studyId);
  }

  @ApiOperation({
    summary: '스터디 생성기능',
    description: '스터디를 생성하고 생성한 유저는 관리자와 멤버로 들어간다',
  })
  @UseGuards(JwtAccessGuard)
  @Post('')
  createStudy(@GetUserId() user, @Body() content) {
    return this.studysService.createStudy(user, content);
  }

  @ApiOperation({
    summary: '스터디 삭제기능',
    description:
      '삭제 하려는 유저가 관리자 권한이 있는지 확인하고 해당 스터디를 삭제한다. ',
  })
  @UseGuards(JwtAccessGuard)
  @Patch('')
  deleteStudy(@GetUserId() user, @Body() study) {
    return this.studysService.deleteStudy(user, study);
  }

  @ApiOperation({
    summary: '스터디 참여기능',
    description:
      '참여하는 유저의 아이디와 참여하려는 스터디의 아이디를 받아 멤버 테이블에 대기중 상태로 넣는다.',
  })
  @UseGuards(JwtAccessGuard)
  @Post('member')
  joinStudy(@GetUserId() user, @Body() study) {
    return this.studysService.joinStudy(user, study);
  }

  @ApiOperation({
    summary: '스터디 탈퇴기능',
    description:
      '탈퇴하려는 유저의 아이디와 스터디의 아이디를 받아 멤버 테이블에서 해당 열의 is_accept를 2로 변경한다. ',
  })
  @UseGuards(JwtAccessGuard)
  @Patch('member')
  exitStudy(@GetUserId() user, @Body() study) {
    return this.studysService.exitStudy(user, study);
  }

  @ApiOperation({
    summary: '스터디 가입요청 수락',
    description: '해당 스터디에 가입하려는 사람의 아이디를 받아 수락한다.',
  })
  @UseGuards(JwtAccessGuard)
  @Patch('admin')
  acceptStudy(@GetUserId() user, @Body() req) {
    return this.studysService.acceptStudy(user, req);
  }

  @ApiOperation({
    summary: '스터디 가입요청 거절 및 강제 퇴장',
    description: '스터디아이디와 가입요청한 유저의 아이디를 받아 거절한다.',
  })
  @UseGuards(JwtAccessGuard)
  @Delete('admin')
  rejectStudy(@GetUserId() user, @Body() req) {
    return this.studysService.rejectStudy(user, req);
  }

  @ApiOperation({
    summary: '스터디 관리자 권한 양도',
    description: '스터디 관리자 권한을 다른 멤버에게 양도한다.',
  })
  @UseGuards(JwtAccessGuard)
  @Patch('admin/transfer-admin')
  transferAdmin(@GetUserId() user, @Body() req) {
    return this.studysService.transferAdmin(user, req);
  }
}
