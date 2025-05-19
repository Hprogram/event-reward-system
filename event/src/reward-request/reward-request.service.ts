import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  EventConditionKeyMap,
  EventConditionType,
  EventStatus,
} from 'src/common/constants/event.constant';
import { CreateRewardRequestDto } from './dto/create-reward-request.dto';
import type { Event } from 'src/event/interfaces/event.interface';
import type { RewardRequest } from './interfaces/reward-request.interface';
import { RewardRequestStatus } from 'src/common/constants/reward-request.constant';

@Injectable()
export class RewardRequestService {
  constructor(
    @InjectModel('RewardRequest')
    private readonly rewardRequestModel: Model<RewardRequest>,
    @InjectModel('Event')
    private readonly eventModel: Model<Event>,
  ) {}

  async create(
    userId: string,
    dto: CreateRewardRequestDto,
  ): Promise<RewardRequest> {
    try {
      const event = await this.eventModel.findById(dto.eventId).exec();
      if (!event) {
        throw new NotFoundException('이벤트를 찾을 수 없습니다.');
      }

      // 이벤트 상태 및 기간 체크
      if (event.status !== EventStatus.ACTIVE) {
        throw new BadRequestException('비활성화된 이벤트입니다.');
      }

      const now = new Date();
      const startDate = new Date(event.startDate);
      const endDate = new Date(event.endDate);

      if (now <= startDate || now >= endDate) {
        throw new BadRequestException('이벤트 기간이 아닙니다.');
      }

      const condition = event.condition;
      const requiredKey =
        EventConditionKeyMap[condition.type as EventConditionType];

      let success = false;
      let reason = '';

      // 조건 검증
      if (requiredKey in dto.progress) {
        const actual = (dto.progress as any)[requiredKey];
        const required = condition.payload[requiredKey];
        success = actual >= required;

        if (!success) {
          reason = `${requiredKey} 값이 부족합니다.`;
        }
      } else {
        throw new BadRequestException(`요청 데이터를 다시 확인해주세요.`);
      }

      // 중복 수령 확인
      const existingSuccess = await this.rewardRequestModel.findOne({
        eventId: dto.eventId,
        userId: userId,
        status: RewardRequestStatus.SUCCESS,
      });

      if (existingSuccess) {
        success = false;
        reason = '이미 보상을 수령한 이벤트입니다.';
      }

      // 결과 저장
      const rewardRequest = new this.rewardRequestModel({
        eventId: dto.eventId,
        userId: userId,
        progress: dto.progress,
        status: success
          ? RewardRequestStatus.SUCCESS
          : RewardRequestStatus.FAIL,
        reason: success ? undefined : reason,
      });

      return await rewardRequest.save();
    } catch (err) {
      console.error('[RewardRequest Create Error]', err);
      if (
        err instanceof NotFoundException ||
        err instanceof BadRequestException
      )
        throw err;

      throw new InternalServerErrorException(
        '보상 요청 처리 중 오류가 발생했습니다.',
      );
    }
  }

  async findAll(query: {
    userId?: string;
    eventId?: string;
    status?: RewardRequestStatus;
  }): Promise<RewardRequest[]> {
    try {
      const filter: any = {};

      if (query.userId) filter.userId = query.userId;
      if (query.eventId) filter.eventId = query.eventId;
      if (query.status) filter.status = query.status;

      return await this.rewardRequestModel
        .find(filter)
        .sort({ createdAt: -1 })
        .exec();
    } catch (err) {
      console.error('[RewardRequest FindAll Error]', err);
      throw new InternalServerErrorException('보상 요청 목록 조회 실패');
    }
  }
}
