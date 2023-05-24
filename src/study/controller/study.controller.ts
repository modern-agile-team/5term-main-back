import { Body, Controller, Post } from '@nestjs/common';
import { StudyService } from '../service/study.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller('studies')
export class StudyController {
  constructor(private studysService: StudyService) {}

  // 스터디 생성
  @ApiOperation({
    summary: '스터디 생성기능',
    description:
      '생성하는 유저의 아이디를 받아 스터디를 생성하고 관리자 권한이 부여되고 멤버로 바로 들어가게 됩니다.',
  })
  @Post('produce')
  createStudy(user = { userId: 75 }, @Body() body) {
    return this.studysService.createStudy(user, body);
  }

  @ApiOperation({
    summary: '스터디 참여기능',
    description:
      '참여하는 유저의 아이디와 참여하려는 스터디의 아이디를 받아 멤버 테이블에 대기중 상태로 넣는다.',
  })
  @Post('participation')
  joinStudy(user = { userId: 76 }, @Body() body) {
    return this.studysService.joinStudy(user, body);
  }
}
