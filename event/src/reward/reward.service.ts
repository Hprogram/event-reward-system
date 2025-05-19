import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Reward } from './interfaces/reward.interface';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateRewardDto } from './dto/create-reward.dto';
import { UpdateRewardDto } from './dto/update-reward.dto';

@Injectable()
export class RewardService {
  constructor(
    @InjectModel('Reward') private readonly rewardModel: Model<Reward>,
    @InjectModel('Event') private readonly eventModel: Model<Event>,
  ) {}

  async create(userId: string, dto: CreateRewardDto): Promise<Reward> {
    try {
      const event = await this.eventModel.findById(dto.eventId);
      if (!event) {
        throw new NotFoundException('해당 이벤트가 존재하지 않습니다.');
      }

      const reward = new this.rewardModel({
        ...dto,
        createdBy: userId,
      });
      return await reward.save();
    } catch (err) {
      console.error('[Reward Create Error]', err);
      if (err instanceof NotFoundException) throw err;

      throw new InternalServerErrorException(
        '보상 등록 중 오류가 발생했습니다.',
      );
    }
  }

  async findAllByEventId(eventId: string): Promise<Reward[]> {
    try {
      const rewards = await this.rewardModel
        .find({ eventId: new Types.ObjectId(eventId) })
        .sort({ createdAt: -1 })
        .exec();

      if (!rewards.length) {
        throw new NotFoundException('해당 이벤트에 등록된 보상이 없습니다.');
      }

      return rewards;
    } catch (err) {
      console.error('[Reward FindAll Error]', err);
      if (err instanceof NotFoundException) throw err;

      throw new InternalServerErrorException(
        '보상 목록 조회 중 오류가 발생했습니다.',
      );
    }
  }

  async update(id: string, dto: UpdateRewardDto): Promise<Reward> {
    try {
      const updated = await this.rewardModel
        .findByIdAndUpdate(id, dto, {
          new: true,
        })
        .exec();

      if (!updated) {
        throw new NotFoundException('보상을 찾을 수 없습니다.');
      }

      return updated;
    } catch (err) {
      console.error('[Reward Update Error]', err);
      if (err instanceof NotFoundException) throw err;

      throw new InternalServerErrorException(
        '보상 수정 중 오류가 발생했습니다.',
      );
    }
  }

  async delete(id: string): Promise<Reward> {
    try {
      const deleted = await this.rewardModel.findByIdAndDelete(id).exec();

      if (!deleted) {
        throw new NotFoundException('보상을 찾을 수 없습니다.');
      }

      return deleted;
    } catch (err) {
      console.error('[Reward Delete Error]', err);
      if (err instanceof NotFoundException) throw err;

      throw new InternalServerErrorException(
        '보상 삭제 중 오류가 발생했습니다.',
      );
    }
  }
}
