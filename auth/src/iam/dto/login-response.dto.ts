import { Expose, Transform } from 'class-transformer';

export class LoginResponseDto {
  @Expose()
  @Transform(({ obj }) => obj._id?.toString())
  _id: string;

  @Expose()
  email: string;

  @Expose()
  role: string;

  @Expose()
  nickname: string;

  @Expose()
  accessToken: string;
}
