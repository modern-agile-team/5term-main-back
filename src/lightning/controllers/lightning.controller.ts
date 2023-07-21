import { LightningService } from './../services/lightning.service';
import { Body, Controller, ParseIntPipe, Get } from '@nestjs/common';
import { Post, Delete } from '@nestjs/common';
import {
  Param,
  Patch,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common/decorators';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { CreateLightningInfoDto } from '../dtos/create-lightning-info.dto';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { UpdateLightningInfoDto } from '../dtos/update-lightning-info.dto';
import { UpdateLightningToUserDto } from '../dtos/update-lightning-to-user.dto';
import { RequestLightningDto } from '../dtos/request-lightning.dto';
import { UpdateAcceptLightningDto } from '../dtos/update-accept-lightning.dto';
import { JwtAccessGuard } from 'src/config/guards/jwt-access-token.guard';
import { GetUserId } from 'src/common/decorators/get-userId.decorator';

@ApiTags('lightning')
@Controller('lightnings')
@UseFilters(HttpExceptionFilter)
@UseInterceptors(SuccessInterceptor)
@UseGuards(JwtAccessGuard)
export class LightningController {
  constructor(private readonly lightningService: LightningService) {}

  @ApiOperation({
    summary: '번개 모임 생성',
  })
  @ApiParam({ name: 'userNo', example: '1', required: true })
  @Post()
  async createLightningInfo(
    @GetUserId() userId: number,
    @Body() createLightninginfoDto: CreateLightningInfoDto,
  ) {
    await this.lightningService.createLightningInfo(
      createLightninginfoDto,
      userId,
    );
    return { msg: '번개 모임 생성 성공' };
  }

  @ApiOperation({
    summary: '번개 모임 삭제',
  })
  @ApiParam({ name: 'lightningNo', example: '1', required: true })
  @Delete('/:lightningNo')
  async deleteLightningInfo(
    @Param('lightningNo', ParseIntPipe) lightningNo: number,
  ) {
    await this.lightningService.deleteLightningInfo(lightningNo);
    return { msg: '번개 모임 삭제 성공' };
  }

  @ApiOperation({
    summary: '번개 모임 유저 관계 삭제',
  })
  @ApiParam({ name: 'relationNo', example: '1', required: true })
  @Delete('/relations/:relationNo')
  async deleteLightningToUser(
    @Param('relationNo', ParseIntPipe) relationNo: number,
  ) {
    await this.lightningService.deleteLightningToUser(relationNo);
    return { msg: '번개 관계 삭제 성공' };
  }

  @ApiOperation({ summary: '번개 날짜 수정' })
  @ApiParam({ name: 'lightningNo', example: '1', required: true })
  @Patch('/:lightningNo')
  async updateLightningInfo(
    @Param('lightningNo', ParseIntPipe) lightningNo: number,
    @Body() updateLightningInfoDto: UpdateLightningInfoDto,
  ) {
    await this.lightningService.updateLightningInfo(
      lightningNo,
      updateLightningInfoDto,
    );
    return { msg: '번개 날짜 수정 성공' };
  }

  @ApiOperation({ summary: '번개 관리자 변경' })
  @ApiParam({ name: 'relationNo', example: '1', required: true })
  @Patch('/admins/:relationNo')
  async updateLightningToUser(
    @Param('relationNo', ParseIntPipe) lightningNo: number,
    @Body() updateLightningToUser: UpdateLightningToUserDto,
  ) {
    await this.lightningService.updateLightningToUser(
      lightningNo,
      updateLightningToUser,
    );
    return { msg: '번개 관리자 변경 성공' };
  }

  @ApiOperation({
    summary: '번개 모임 신청',
  })
  @Post('/relations')
  async requestLightning(
    @GetUserId() userId: number,
    @Body() requestLightningDto: RequestLightningDto,
  ) {
    await this.lightningService.requestLightning(requestLightningDto, userId);
    return { msg: '번개 모임 신청 성공' };
  }

  @ApiOperation({
    summary: '번개 모임 신청 수락 및 거부',
  })
  @ApiParam({ name: 'relationNo', example: '1', required: true })
  @Patch('/relations/:relationNo')
  async acceptLightning(
    @Param('relationNo', ParseIntPipe) relationNo: number,
    @Body() updateAcceptLightningDto: UpdateAcceptLightningDto,
  ) {
    const accept = await this.lightningService.updateAcceptLightning(
      relationNo,
      updateAcceptLightningDto,
    );
    if (!accept) {
      return { msg: '번개 모임 신청이 거부되었습니다.' };
    }
    return { msg: '번개 모임 신청 수락 성공' };
  }

  @ApiOperation({
    summary: '해당 유저 번개 모임 조회',
  })
  @Get('/my-pages/:userNo')
  async getLightningByUser(@GetUserId() userId: number) {
    const lightning = await this.lightningService.getLightningByUser(userId);
    return { msg: '해당 유저 번개 모임 조회 성공', lightning };
  }

  @ApiOperation({
    summary: '해당 번개 멤버 조회',
  })
  @ApiParam({ name: 'lightningNo', example: '1', required: true })
  @Get('/:lightningNo/lightning-members')
  async getUserByLightning(
    @Param('lightningNo', ParseIntPipe) lightningNo: number,
  ) {
    const user = await this.lightningService.getUserByLightning(lightningNo);
    return { msg: '해당 번개 멤버 조회 성공', user };
  }

  @ApiOperation({
    summary: '번개 모임 단일 조회',
  })
  @ApiParam({ name: 'lightningNo', example: '1', required: true })
  @Get('/:lightningNo')
  async getLightningInfo(
    @Param('lightningNo', ParseIntPipe) lightningNo: number,
  ) {
    const lightning = await this.lightningService.getLightningInfo(lightningNo);
    return { msg: '번개 모임 단일 조회 성공', lightning };
  }

  @ApiOperation({
    summary: '번개 모임 신청 목록 조회',
  })
  @ApiParam({ name: 'lightningNo', example: '1', required: true })
  @Get('/:lightningNo/lightning-members/applicants')
  async getLightningApplicant(
    @Param('lightningNo', ParseIntPipe) lightningNo: number,
  ) {
    const user = await this.lightningService.getLightningApplicant(lightningNo);
    return { msg: '해당 번개 신청자 조회 성공', user };
  }
}
