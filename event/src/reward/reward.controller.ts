import { Body, Controller, Post } from '@nestjs/common';
import { RewardService } from './reward.service';
import { CreateRewardDto } from './dto/create-reward.dto';
import { RewardResponseDto } from './dto/reward-response.dto';
import { plainToInstance } from 'class-transformer';

@Controller('reward')
export class RewardController {
  constructor(private readonly rewardService: RewardService) {}

  @Post()
  async create(@Body() dto: CreateRewardDto): Promise<RewardResponseDto> {
    const result = await this.rewardService.create(dto);
    return plainToInstance(RewardResponseDto, result, {
      excludeExtraneousValues: true,
    });
  }
}
