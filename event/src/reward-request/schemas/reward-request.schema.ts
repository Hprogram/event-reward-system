import { Schema, Types } from 'mongoose';
import { RewardRequestStatus } from 'src/common/constants/reward-request.constant';

export const RewardRequestSchema = new Schema(
  {
    eventId: {
      type: Types.ObjectId,
      ref: 'Event',
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    progress: {
      // 이벤트 진행 정도
      type: Schema.Types.Mixed,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(RewardRequestStatus),
      required: true,
    },
    reason: {
      type: String,
    },
  },
  { timestamps: true },
);
