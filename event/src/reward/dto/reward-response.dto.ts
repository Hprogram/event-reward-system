import { Exclude, Expose, Transform } from 'class-transformer';
import { RewardType } from 'src/common/constants/reward.constant';

export class RewardResponseDto {
  @Expose()
  @Transform(({ obj }) => obj._id.toString())
  _id: string;

  @Expose()
  @Transform(({ obj }) => obj.eventId.toString())
  eventId: string;

  @Expose()
  type: RewardType;

  @Expose()
  amount: number;

  @Expose()
  description?: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Exclude()
  __v: number;
}
