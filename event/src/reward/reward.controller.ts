import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { RewardService } from './reward.service';
import { CreateRewardDto } from './dto/create-reward.dto';
import { RewardResponseDto } from './dto/reward-response.dto';
import { plainToInstance } from 'class-transformer';
import { UpdateRewardDto } from './dto/update-reward.dto';

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

  @Get()
  async findAll(@Query('eventId') eventId: string) {
    const rewards = await this.rewardService.findAllByEventId(eventId);
    return plainToInstance(RewardResponseDto, rewards, {
      excludeExtraneousValues: true,
    });
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateRewardDto) {
    const result = await this.rewardService.update(id, dto);
    return plainToInstance(RewardResponseDto, result, {
      excludeExtraneousValues: true,
    });
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const result = await this.rewardService.delete(id);
    return plainToInstance(RewardResponseDto, result, {
      excludeExtraneousValues: true,
    });
  }
}
