import {
  IsEnum,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { RewardType } from 'src/common/constants/reward.constant';

export class CreateRewardDto {
  @IsMongoId()
  eventId: string;

  @IsEnum(RewardType)
  type: RewardType;

  @IsNumber()
  amount: number;

  @IsOptional()
  @IsString()
  description?: string;
}
