import { HttpService } from '@nestjs/axios';
import {
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';
import { RequestWithUser } from 'src/common/interfaces/jwt.interface';

@Injectable()
export class RewardService {
  constructor(
    private readonly http: HttpService,
    private readonly config: ConfigService,
  ) {}

  private handleError(prefix: string, err: any): never {
    console.error(prefix, err?.response?.data || err);

    if (err.response?.status && err.response?.data?.message) {
      throw new HttpException(err.response.data.message, err.response.status);
    }

    throw new InternalServerErrorException(
      'Reward 서버 요청 중 오류가 발생했습니다.',
    );
  }

  async create(req: RequestWithUser, dto: any) {
    try {
      const userId = req.user?.sub;
      const url = `${this.config.get('EVENT_SERVICE_URL')}/reward`;
      const res = await lastValueFrom(
        this.http.post(url, dto, {
          headers: { 'x-user-sub': userId },
        }),
      );
      return res.data;
    } catch (err) {
      this.handleError('[Gateway:createReward]', err);
    }
  }

  async findAllByEventId(eventId: string) {
    try {
      const url = `${this.config.get('EVENT_SERVICE_URL')}/reward`;
      const res = await lastValueFrom(
        this.http.get(url, { params: { eventId } }),
      );
      return res.data;
    } catch (err) {
      this.handleError('[Gateway:findAllRewards]', err);
    }
  }

  async update(rewardId: string, dto: any) {
    try {
      const url = `${this.config.get('EVENT_SERVICE_URL')}/reward`;
      const res = await lastValueFrom(
        this.http.patch(url, dto, { params: { rewardId } }),
      );
      return res.data;
    } catch (err) {
      this.handleError('[Gateway:updateReward]', err);
    }
  }

  async delete(rewardId: string) {
    try {
      const url = `${this.config.get('EVENT_SERVICE_URL')}/reward`;
      const res = await lastValueFrom(
        this.http.delete(url, { params: { rewardId } }),
      );
      return res.data;
    } catch (err) {
      this.handleError('[Gateway:deleteReward]', err);
    }
  }
}
