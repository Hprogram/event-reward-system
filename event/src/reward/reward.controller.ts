import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { RewardService } from './reward.service';
import { CreateRewardDto } from './dto/create-reward.dto';
import { RewardResponseDto } from './dto/reward-response.dto';
import { plainToInstance } from 'class-transformer';
import { UpdateRewardDto } from './dto/update-reward.dto';
import type { Request } from 'express';

@Controller('reward')
export class RewardController {
  constructor(private readonly rewardService: RewardService) {}

  @Post()
  async create(
    @Req() req: Request,
    @Body() dto: CreateRewardDto,
  ): Promise<RewardResponseDto> {
    const userId = req.headers['x-user-sub'] as string;

    const result = await this.rewardService.create(userId, dto);
    return plainToInstance(RewardResponseDto, result, {
      excludeExtraneousValues: true,
    });
  }

  @Get()
  async findAll(@Query('eventId') eventId: string) {
    const rewards = await this.rewardService.findAllByEventId(eventId);
    return plainToInstance(RewardResponseDto, rewards, {
      excludeExtraneousValues: true,
    });
  }

  @Patch()
  async update(
    @Query('rewardId') rewardId: string,
    @Body() dto: UpdateRewardDto,
  ) {
    const result = await this.rewardService.update(rewardId, dto);
    return plainToInstance(RewardResponseDto, result, {
      excludeExtraneousValues: true,
    });
  }

  @Delete()
  async delete(@Query('rewardId') rewardId: string) {
    const result = await this.rewardService.delete(rewardId);
    return plainToInstance(RewardResponseDto, result, {
      excludeExtraneousValues: true,
    });
  }
}
