import { Document, Types } from 'mongoose';
import { RewardType } from 'src/common/constants/reward.constant';

export interface Reward extends Document {
  eventId: Types.ObjectId;
  type: RewardType;
  amount: number;
  description?: string;
}
