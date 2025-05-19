import { Module } from '@nestjs/common';
import { RewardController } from './reward.controller';
import { RewardService } from './reward.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RewardSchema } from './schemas/reward.schema';
import { EventModule } from 'src/event/event.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Reward', schema: RewardSchema }]),
    EventModule,
  ],
  controllers: [RewardController],
  providers: [RewardService],
})
export class RewardModule {}
