import { Module } from '@nestjs/common';
import { RewardRequestController } from './reward-request.controller';
import { RewardRequestService } from './reward-request.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [RewardRequestController],
  providers: [RewardRequestService],
})
export class RewardRequestModule {}
