import { Controller, UseFilters, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';

@ApiTags('study-tools')
@UseFilters(HttpExceptionFilter)
@UseInterceptors(SuccessInterceptor)
@Controller('study-tools')
export class StudyToolsController {}
