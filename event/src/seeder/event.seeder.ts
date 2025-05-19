import { INestApplication } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  EventConditionType,
  EventStatus,
} from 'src/common/constants/event.constant';
import { Reward } from 'src/reward/interfaces/reward.interface';

export async function seedEvents(app: INestApplication) {
  const eventModel = app.get<Model<Event>>(getModelToken('Event'));
  const rewardModel = app.get<Model<Reward>>(getModelToken('Reward'));

  const eventPayloads = [
    {
      title: '몬스터 1000마리 처치',
      description: '몬스터를 많이 잡아주세요. 극한 성장의 비약 1개 지급',
      condition: {
        type: EventConditionType.MONSTER_KILL,
        payload: { count: 1000 },
      },
      reward: {
        type: 'ITEM',
        description: '극한 성장의 비약',
        amount: 1,
      },
    },
    {
      title: '7일 연속 출석',
      description: '꾸준함을 보상합니다. 메이플포인트 10000원 지급',
      condition: {
        type: EventConditionType.DAILY_CHECKIN,
        payload: { days: 7 },
      },
      reward: {
        type: 'POINT',
        description: '메이플포인트',
        amount: 10000,
      },
    },
    {
      title: '친구 3명 초대',
      description: '친구랑 같이 하면 더 즐거워요. 경험치 2배 쿠폰 3장 지급',
      condition: {
        type: EventConditionType.FRIEND_INVITE,
        payload: { invites: 3 },
      },
      reward: {
        type: 'COUPON',
        description: '경험치 2배 쿠폰',
        amount: 3,
      },
    },
  ];

  for (const payload of eventPayloads) {
    const exists = await eventModel.findOne({ title: payload.title });
    let event;

    if (!exists) {
      event = await eventModel.create({
        ...payload,
        startDate: new Date(),
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        status: EventStatus.ACTIVE,
        createdBy: 'mockAdminId',
      });
      console.log(`[seed] 이벤트 생성: ${payload.title}`);
    } else {
      event = exists;
    }

    const rewardExists = await rewardModel.findOne({
      eventId: event._id,
      description: payload.reward.description,
    });

    if (!rewardExists) {
      await rewardModel.create({
        eventId: event._id,
        ...payload.reward,
        createdBy: 'mockAdminId',
      });
      console.log(`[seed] 보상 생성: ${payload.reward.description}`);
    }
  }
}
