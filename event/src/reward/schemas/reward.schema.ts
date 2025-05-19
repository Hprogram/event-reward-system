import { Schema, Types } from 'mongoose';
import { RewardType } from 'src/common/constants/reward.constant';

export const RewardSchema = new Schema(
  {
    eventId: {
      type: Types.ObjectId,
      ref: 'Event',
      required: true,
    },
    type: {
      type: String,
      enum: Object.values(RewardType),
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
    },
    createdBy: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);
