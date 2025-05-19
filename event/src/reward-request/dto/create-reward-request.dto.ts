import { IsMongoId, IsObject } from 'class-validator';
import { Progress } from '../interfaces/reward-request.interface';

export class CreateRewardRequestDto {
  @IsMongoId()
  eventId: string;

  @IsObject()
  progress: Progress;
}
