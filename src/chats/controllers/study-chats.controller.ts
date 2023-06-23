import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { StudyChatsService } from '../services/study-chats.service';

@ApiTags('chats')
@Controller('chats')
export class StudyChatsController {
  constructor(private readonly studyChatsService: StudyChatsService) {}
}
