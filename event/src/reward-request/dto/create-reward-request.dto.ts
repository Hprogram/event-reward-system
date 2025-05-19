import { IsMongoId, IsNotEmpty, IsObject, IsString } from 'class-validator';
import { Progress } from '../interfaces/reward-request.interface';

export class CreateRewardRequestDto {
  @IsMongoId()
  eventId: string;

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsObject()
  progress: Progress;
}
