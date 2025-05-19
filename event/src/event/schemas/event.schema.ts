import { Schema } from 'mongoose';
import {
  EventConditionType,
  EventStatus,
} from 'src/common/constants/event.constant';

export const EventSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    condition: {
      type: {
        type: String,
        enum: Object.values(EventConditionType),
        required: true,
      },
      payload: {
        type: Schema.Types.Mixed,
        required: true,
      },
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    status: {
      type: String,
      enum: Object.values(EventStatus),
      default: 'ACTIVE',
    },
    createdBy: { type: String, required: true }, // 이벤트를 생성한 관리자 ID
  },
  { timestamps: true },
);
