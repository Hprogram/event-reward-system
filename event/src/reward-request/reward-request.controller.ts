import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { RewardRequestService } from './reward-request.service';
import { CreateRewardRequestDto } from './dto/create-reward-request.dto';
import { RewardRequestResponseDto } from './dto/reward-request-response.dto';
import { plainToInstance } from 'class-transformer';
import { RewardRequestStatus } from 'src/common/constants/reward-request.constant';

@Controller('reward-request')
export class RewardRequestController {
  constructor(private readonly rewardRequestService: RewardRequestService) {}

  @Post()
  async create(
    @Body() dto: CreateRewardRequestDto,
  ): Promise<RewardRequestResponseDto> {
    const result = await this.rewardRequestService.create(dto);
    return plainToInstance(RewardRequestResponseDto, result, {
      excludeExtraneousValues: true,
    });
  }

  @Get()
  async findAll(
    @Query('eventId') eventId?: string,
    @Query('status') status?: RewardRequestStatus,
  ): Promise<RewardRequestResponseDto[]> {
    const result = await this.rewardRequestService.findAll({ eventId, status });
    return plainToInstance(RewardRequestResponseDto, result, {
      excludeExtraneousValues: true,
    });
  }

  @Get('me')
  async findMyRequests(
    @Query('userId') userId: string,
  ): Promise<RewardRequestResponseDto[]> {
    const result = await this.rewardRequestService.findAll({ userId });

    return plainToInstance(RewardRequestResponseDto, result, {
      excludeExtraneousValues: true,
    });
  }
}
