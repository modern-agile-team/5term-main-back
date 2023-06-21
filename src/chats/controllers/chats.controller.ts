import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('chats')
@Controller('lightning-chats')
export class LightningChatsController {}
