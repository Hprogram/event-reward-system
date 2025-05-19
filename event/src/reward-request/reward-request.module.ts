import { Module } from '@nestjs/common';
import { RewardRequestService } from './reward-request.service';
import { RewardRequestController } from './reward-request.controller';

@Module({
  providers: [RewardRequestService],
  controllers: [RewardRequestController]
})
export class RewardRequestModule {}
