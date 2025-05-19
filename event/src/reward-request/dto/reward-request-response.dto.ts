import { Exclude, Expose, Transform } from 'class-transformer';
import { IsNumber } from 'class-validator';
import { RewardRequestStatus } from 'src/common/constants/reward-request.constant';
import { Progress } from '../interfaces/reward-request.interface';

export class MonsterKillProgress {
  @IsNumber()
  count: number;
}

export class DailyCheckInProgress {
  @IsNumber()
  days: number;
}

export class FriendInviteProgress {
  @IsNumber()
  invites: number;
}

export class RewardRequestResponseDto {
  @Expose()
  @Transform(({ obj }) => obj._id.toString())
  _id: string;

  @Expose()
  @Transform(({ obj }) => obj.eventId.toString())
  eventId: string;

  @Expose()
  @Transform(({ obj }) => obj.userId.toString())
  userId: string;

  @Expose()
  progress: Progress;

  @Expose()
  status: RewardRequestStatus;

  @Expose()
  reason?: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Exclude()
  __v: number;
}
