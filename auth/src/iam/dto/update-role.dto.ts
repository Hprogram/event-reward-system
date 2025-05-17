import { Transform } from 'class-transformer';
import { IsIn } from 'class-validator';

export class UpdateRoleDto {
  @Transform(({ value }) => value.toUpperCase())
  @IsIn(['USER', 'OPERATOR', 'AUDITOR', 'ADMIN'])
  role: 'USER' | 'OPERATOR' | 'AUDITOR' | 'ADMIN';
}
