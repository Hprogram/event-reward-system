import { Document } from 'mongoose';
import {
  EventConditionType,
  EventStatus,
} from 'src/common/constants/event.constant';

export interface Event extends Document {
  title: string;
  description: string;
  condition: {
    type: EventConditionType;
    payload: Record<string, any>;
  };
  startDate: Date;
  endDate: Date;
  status: EventStatus;
  createdBy: string;
}
