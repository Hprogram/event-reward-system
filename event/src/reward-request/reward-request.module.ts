import { Module } from '@nestjs/common';
import { RewardRequestService } from './reward-request.service';
import { RewardRequestController } from './reward-request.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RewardRequestSchema } from './schemas/reward-request.schema';
import { EventModule } from 'src/event/event.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'RewardRequest', schema: RewardRequestSchema },
    ]),
    EventModule,
  ],
  providers: [RewardRequestService],
  controllers: [RewardRequestController],
  exports: [MongooseModule],
})
export class RewardRequestModule {}
