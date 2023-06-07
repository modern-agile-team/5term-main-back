import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { StudyService } from '../service/study.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { StudisQueryDto } from '../studis-query-dto';

@ApiTags('studies')
@Controller('studies')
export class StudyController {
  constructor(private studysService: StudyService) {}

  @ApiOperation({
    summary: '스터디 조회',
    description:
      'url에 변수를 넣으면 검색조건에 해당하는 스터디만 뽑아옴(없으면 모든 스터디 리턴)',
  })
  @Get('')
  getStudyList(@Query() studisQueryDto: StudisQueryDto) {
    return this.studysService.getStudyList(studisQueryDto);
  }

  @ApiOperation({
    summary: '스터디 상세 조회',
    description: '스터디 아이디 받아서 스터디정보,관리자 멤버 정보 return',
  })
  @Get(':id')
  getStudy(@Param('id') studyId: number) {
    return this.studysService.getStudy(studyId);
  }

  @ApiOperation({
    summary: '스터디 생성기능',
    description:
      '생성하는 유저의 아이디를 받아 스터디를 생성한 다음 관리자 권한이 부여하고 멤버로 바로 들어가게 된다.',
  })
  @Post('')
  createStudy(user = { userId: 75 }, @Body() content) {
    return this.studysService.createStudy(user, content);
  }

  @ApiOperation({
    summary: '스터디 삭제기능',
    description:
      '삭제 하려는 유저가 관리자 권한이 있는지 확인하고 해당 스터디를 삭제한다. ',
  })
  @Patch('')
  deleteStudy(user = { userId: 75 }, @Body() study) {
    return this.studysService.deleteStudy(user, study);
  }

  @ApiOperation({
    summary: '스터디 참여기능',
    description:
      '참여하는 유저의 아이디와 참여하려는 스터디의 아이디를 받아 멤버 테이블에 대기중 상태로 넣는다.',
  })
  @Post('member')
  joinStudy(user = { userId: 77 }, @Body() study) {
    return this.studysService.joinStudy(user, study);
  }

  @ApiOperation({
    summary: '스터디 탈퇴기능',
    description:
      '탈퇴하려는 유저의 아이디와 스터디의 아이디를 받아 멤버 테이블에서 해당 열의 is_accept를 2로 변경한다. ',
  })
  @Patch('member')
  exitStudy(user = { userId: 75 }, @Body() study) {
    return this.studysService.exitStudy(user, study);
  }

  @ApiOperation({
    summary: '스터디 가입요청 수락',
    description: '해당 스터디에 가입하려는 사람의 아이디를 받아 수락한다.',
  })
  @Patch('member/admin')
  acceptStudy(user = { userId: 75 }, @Body() req) {
    return this.studysService.acceptStudy(user, req);
  }

  @ApiOperation({
    summary: '스터디 가입요청 거절 및 강제 퇴장',
    description: '스터디아이디와 가입요청한 유저의 아이디를 받아 거절한다.',
  })
  @Delete('member/admin')
  rejectStudy(user = { userId: 75 }, @Body() req) {
    return this.studysService.rejectStudy(user, req);
  }

  @ApiOperation({
    summary: '스터디 관리자 권한 양도',
    description: '스터디 관리자 권한을 다른 멤버에게 양도한다.',
  })
  @Patch('member/admin/transfer-admin')
  transferAdmin(user = { userId: 75 }, @Body() req) {
    return this.studysService.transferAdmin(user, req);
  }
}
