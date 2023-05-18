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
  createStudy(user = { userId: 41 }, @Body() body) {
    return this.studysService.createStudy(user, body);
  }
}
