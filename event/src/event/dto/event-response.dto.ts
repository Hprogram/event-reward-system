import { Exclude, Expose, Transform, Type } from 'class-transformer';
import {
  EventConditionType,
  EventStatus,
} from 'src/common/constants/event.constant';

class ConditionResponseDto {
  @Expose()
  type: EventConditionType;

  @Expose()
  payload: Record<string, any>;
}

export class EventResponseDto {
  @Expose()
  @Transform(({ obj }) => obj._id?.toString())
  _id: string;

  @Expose()
  title: string;

  @Expose()
  description: string;

  @Expose()
  @Type(() => ConditionResponseDto)
  condition: ConditionResponseDto;

  @Expose()
  startDate: Date;

  @Expose()
  endDate: Date;

  @Expose()
  status: EventStatus;

  @Expose()
  createdBy: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Exclude()
  __v: number;
}
