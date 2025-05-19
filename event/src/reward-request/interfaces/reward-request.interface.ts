import { Document, Types } from 'mongoose';
import { RewardRequestStatus } from 'src/common/constants/reward-request.constant';

export type Progress =
  | { count: number } // 몬스터 처치 횟수
  | { days: number } // 체크인 일수
  | { invites: number }; // 친구 초대 횟수

export interface RewardRequest extends Document {
  eventId: Types.ObjectId;
  userId: string;
  progress: Progress;
  status: RewardRequestStatus;
  reason?: string;
}
