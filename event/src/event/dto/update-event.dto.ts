import {
  IsString,
  IsDateString,
  ValidateNested,
  IsEnum,
  IsObject,
  IsNumber,
  IsOptional,
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

export class UpdateEventDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => ConditionDto)
  condition?: ConditionDto;

  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsOptional()
  @IsEnum(EventStatus)
  status?: EventStatus;

  @IsOptional()
  @IsString()
  createdBy?: string;
}
