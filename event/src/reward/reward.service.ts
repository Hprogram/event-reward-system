import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Reward } from './interfaces/reward.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateRewardDto } from './dto/create-reward.dto';

@Injectable()
export class RewardService {
  constructor(
    @InjectModel('Reward') private readonly rewardModel: Model<Reward>,
    @InjectModel('Event') private readonly eventModel: Model<Event>,
  ) {}

  async create(dto: CreateRewardDto): Promise<Reward> {
    try {
      const event = await this.eventModel.findById(dto.eventId);
      if (!event) {
        throw new NotFoundException('해당 이벤트가 존재하지 않습니다.');
      }

      const reward = new this.rewardModel(dto);
      return await reward.save();
    } catch (err) {
      console.error('[Reward Create Error]', err);
      if (err instanceof NotFoundException) throw err;

      throw new InternalServerErrorException(
        '보상 등록 중 오류가 발생했습니다.',
      );
    }
  }
}
