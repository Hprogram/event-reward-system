import { Expose } from 'class-transformer';

export class LoginResponseDto {
  @Expose()
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
