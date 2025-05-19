import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { RewardRequestService } from './reward-request.service';
import { CreateRewardRequestDto } from './dto/create-reward-request.dto';
import { RewardRequestResponseDto } from './dto/reward-request-response.dto';
import { plainToInstance } from 'class-transformer';
import { RewardRequestStatus } from 'src/common/constants/reward-request.constant';
import type { Request } from 'express';

@Controller('reward-request')
export class RewardRequestController {
  constructor(private readonly rewardRequestService: RewardRequestService) {}

  @Post()
  async create(
    @Req() req: Request,
    @Body() dto: CreateRewardRequestDto,
  ): Promise<RewardRequestResponseDto> {
    const userId = req.headers['x-user-sub'] as string;

    const result = await this.rewardRequestService.create(userId, dto);
    return plainToInstance(RewardRequestResponseDto, result, {
      excludeExtraneousValues: true,
    });
  }

  @Get()
  async findAll(
    @Req() req: Request,
    @Query('eventId') eventId?: string,
    @Query('status') status?: RewardRequestStatus,
  ): Promise<RewardRequestResponseDto[]> {
    const userId = req.headers['x-user-sub'] as string;

    const result = await this.rewardRequestService.findAll({
      eventId,
      userId,
      status,
    });
    return plainToInstance(RewardRequestResponseDto, result, {
      excludeExtraneousValues: true,
    });
  }

  @Get('me')
  async findMyRequests(
    @Req() req: Request,
  ): Promise<RewardRequestResponseDto[]> {
    const userId = req.headers['x-user-sub'] as string;

    const result = await this.rewardRequestService.findAll({ userId });

    return plainToInstance(RewardRequestResponseDto, result, {
      excludeExtraneousValues: true,
    });
  }
}
