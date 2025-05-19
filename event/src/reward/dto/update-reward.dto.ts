import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateRewardDto {
  @IsOptional()
  @IsNumber()
  amount?: number;

  @IsOptional()
  @IsString()
  description?: string;
}
