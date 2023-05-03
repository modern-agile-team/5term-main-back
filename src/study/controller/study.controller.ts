import { Body, Controller, Post } from '@nestjs/common';
import { StudyService } from '../service/study.service';

@Controller('studies')
export class StudyController {
  constructor(private studysService: StudyService) {}

  @Post('')
  createStudy(user = { userId: 41 }, @Body() body) {
    return this.studysService.createStudy(user, body);
  }
}
