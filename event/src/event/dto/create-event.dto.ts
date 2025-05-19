import {
  IsString,
  IsDateString,
  ValidateNested,
  IsEnum,
  IsObject,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';
import {
  EventConditionType,
  EventStatus,
} from 'src/common/constants/event.constant';

class MonsterKillPayload {
  @IsNumber()
  count: number;
}

class DailyCheckInPayload {
  @IsNumber()
  days: number;
}

class FriendInvitePayload {
  @IsNumber()
  invites: number;
}

class ConditionDto {
  @IsEnum(EventConditionType)
  type: EventConditionType;

  @ValidateNested()
  @Type((obj) => {
    switch (obj?.object?.type) {
      case EventConditionType.MONSTER_KILL:
        return MonsterKillPayload;
      case EventConditionType.DAILY_CHECKIN:
        return DailyCheckInPayload;
      case EventConditionType.FRIEND_INVITE:
        return FriendInvitePayload;
      default:
        return Object;
    }
  })
  payload: unknown;
}

export class CreateEventDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @ValidateNested()
  @Type(() => ConditionDto)
  condition: ConditionDto;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsEnum(EventStatus)
  status: EventStatus;
}
