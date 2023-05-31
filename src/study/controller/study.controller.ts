import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { StudyService } from '../service/study.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller('studies')
export class StudyController {
  constructor(private studysService: StudyService) {}

  @ApiOperation({
    summary: '스터디 조회',
    description:
      'url에 유저 아이디를 넣으면 유저가 가입한 스터디를 전부 리턴하고 스터디 아이디를 넣으면 스터디의 상세정보를 리턴한다.',
  })
  @Get('')
  getStudies(
    @Query('userId') userId: number,
    @Query('studyId') studyId: number,
  ) {
    if (userId) {
      return this.studysService.getStudies(userId);
    } else if (studyId) {
      return this.studysService.getStudyInfo(studyId);
    }
  }
  @ApiOperation({
    summary: '스터디 생성기능',
    description:
      '생성하는 유저의 아이디를 받아 스터디를 생성한 다음 관리자 권한이 부여하고 멤버로 바로 들어가게 된다.',
  })
  @Post('produce')
  createStudy(user = { userId: 75 }, @Body() content) {
    return this.studysService.createStudy(user, content);
  }

  @ApiOperation({
    summary: '스터디 삭제기능',
    description:
      '삭제 하려는 유저가 관리자 권한이 있는지 확인하고 해당 스터디를 삭제한다. ',
  })
  @Patch('produce')
  deleteStudy(user = { userId: 75 }, @Body() study) {
    return this.studysService.deleteStudy(user, study);
  }

  @ApiOperation({
    summary: '스터디 참여기능',
    description:
      '참여하는 유저의 아이디와 참여하려는 스터디의 아이디를 받아 멤버 테이블에 대기중 상태로 넣는다.',
  })
  @Post('participation')
  joinStudy(user = { userId: 77 }, @Body() study) {
    return this.studysService.joinStudy(user, study);
  }

  @ApiOperation({
    summary: '스터디 탈퇴기능',
    description:
      '탈퇴하려는 유저의 아이디와 스터디의 아이디를 받아 멤버 테이블에서 해당 열의 is_accept를 2로 변경한다. ',
  })
  @Patch('participation')
  exitStudy(user = { userId: 75 }, @Body() study) {
    return this.studysService.exitStudy(user, study);
  }

  @ApiOperation({
    summary: '스터디 가입요청 수락',
    description: '해당 스터디에 가입하려는 사람의 아이디를 받아 수락한다.',
  })
  @Patch('participation/accept')
  acceptStudy(user = { userId: 75 }, @Body() req) {
    return this.studysService.acceptStudy(user, req);
  }

  @ApiOperation({
    summary: '스터디 가입요청 거절 및 강제 퇴장',
    description: '스터디아이디와 가입요청한 유저의 아이디를 받아 거절한다.',
  })
  @Delete('participation/accept')
  rejectStudy(user = { userId: 75 }, @Body() req) {
    return this.studysService.rejectStudy(user, req);
  }

  @ApiOperation({
    summary: '스터디 관리자 권한 양도',
    description: '스터디 관리자 권한을 다른 멤버에게 양도한다.',
  })
  @Patch('authority')
  transferAdmin(user = { userId: 75 }, @Body() req) {
    return this.studysService.transferAdmin(user, req);
  }
}
