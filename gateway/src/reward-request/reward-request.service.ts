import { HttpService } from '@nestjs/axios';
import {
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class RewardRequestService {
  constructor(
    private readonly http: HttpService,
    private readonly config: ConfigService,
  ) {}

  private handleError(prefix: string, err: any): never {
    console.error(prefix, err?.response?.data || err);

    if (err.response?.status && err.response?.data?.message) {
      throw new HttpException(err.response.data.message, err.response.status);
    }

    throw new InternalServerErrorException('RewardRequest 서버 요청 중 오류');
  }

  async create(userId: string, dto: any) {
    try {
      const url = `${this.config.get('EVENT_SERVICE_URL')}/reward-request`;
      const res = await lastValueFrom(
        this.http.post(url, dto, {
          headers: { 'x-user-sub': userId },
        }),
      );
      return res.data;
    } catch (err) {
      this.handleError('[Gateway:createRewardRequest]', err);
    }
  }

  async findAll(params: {
    eventId?: string;
    status?: string;
    userId?: string;
  }) {
    try {
      const url = `${this.config.get('EVENT_SERVICE_URL')}/reward-request`;
      const res = await lastValueFrom(
        this.http.get(url, {
          params,
        }),
      );
      return res.data;
    } catch (err) {
      this.handleError('[Gateway:findAllRewardRequest]', err);
    }
  }

  async findMyRequests(userId: string) {
    try {
      const url = `${this.config.get('EVENT_SERVICE_URL')}/reward-request/me`;
      const res = await lastValueFrom(
        this.http.get(url, {
          headers: { 'x-user-sub': userId },
        }),
      );
      return res.data;
    } catch (err) {
      this.handleError('[Gateway:findMyRewardRequest]', err);
    }
  }
}
