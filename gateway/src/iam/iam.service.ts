import {
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class IamService {
  constructor(
    private readonly http: HttpService,
    private readonly config: ConfigService,
  ) {}

  async register(dto: RegisterUserDto) {
    try {
      const url = `${this.config.get('AUTH_SERVICE_URL')}/iam/register`;
      const res = await lastValueFrom(this.http.post(url, dto));
      return res.data;
    } catch (err) {
      this.handleError('[Gateway:register]', err);
    }
  }

  async login(dto: LoginDto) {
    try {
      const url = `${this.config.get('AUTH_SERVICE_URL')}/iam/login`;
      const res = await lastValueFrom(this.http.post(url, dto));
      return res.data;
    } catch (err) {
      this.handleError('[Gateway:login]', err);
    }
  }

  async updateUser(id: string, token: string, body: UpdateUserDto) {
    try {
      const url = `${this.config.get('AUTH_SERVICE_URL')}/iam/user/${id}`;
      const res = await lastValueFrom(
        this.http.patch(url, body, { headers: { Authorization: token } }),
      );
      return res.data;
    } catch (err) {
      this.handleError('[Gateway:updateUser]', err);
    }
  }

  async updateRole(id: string, token: string, body: UpdateRoleDto) {
    try {
      const url = `${this.config.get('AUTH_SERVICE_URL')}/iam/user/${id}/role`;
      const res = await lastValueFrom(
        this.http.patch(url, body, { headers: { Authorization: token } }),
      );
      return res.data;
    } catch (err) {
      this.handleError('[Gateway:updateRole]', err);
    }
  }

  private handleError(prefix: string, err: any): never {
    console.error(prefix, err?.response?.data || err);

    if (err.response?.status && err.response?.data?.message) {
      throw new HttpException(err.response.data.message, err.response.status);
    }

    // 단순 네트워크 에러
    throw new InternalServerErrorException(
      'Auth 서버 요청 중 오류가 발생했습니다.',
    );
  }
}
