import { Body, Controller, Post } from '@nestjs/common';
import { StudyService } from './study.service';

@Controller('studies')
export class StudyController {
  constructor(private studysService: StudyService) {}

  @Post('')
  createStudy(user = { id: 28 }, @Body() body) {
    return this.studysService.createStudy(user, body);
  }
}
