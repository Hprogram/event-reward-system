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
export class EventService {
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
      'Event 서버 요청 중 오류가 발생했습니다.',
    );
  }

  async create(req: RequestWithUser, dto: any) {
    try {
      const userId = req.user?.sub;
      const url = `${this.config.get('EVENT_SERVICE_URL')}/event`;

      const res = await lastValueFrom(
        this.http.post(url, dto, {
          headers: {
            'x-user-sub': userId,
          },
        }),
      );
      return res.data;
    } catch (err) {
      this.handleError('[Gateway:createEvent]', err);
    }
  }

  async findAll(status?: string) {
    try {
      const url = `${this.config.get('EVENT_SERVICE_URL')}/event`;
      const res = await lastValueFrom(
        this.http.get(url, {
          params: status ? { status } : {},
        }),
      );
      return res.data;
    } catch (err) {
      this.handleError('[Gateway:findAllEvents]', err);
    }
  }

  async findOne(eventId: string) {
    try {
      const url = `${this.config.get('EVENT_SERVICE_URL')}/event/detail`;
      const res = await lastValueFrom(
        this.http.get(url, {
          params: { eventId },
        }),
      );
      return res.data;
    } catch (err) {
      this.handleError('[Gateway:findOneEvent]', err);
    }
  }

  async update(eventId: string, dto: any) {
    try {
      const url = `${this.config.get('EVENT_SERVICE_URL')}/event`;
      const res = await lastValueFrom(
        this.http.patch(url, dto, {
          params: { eventId },
        }),
      );
      return res.data;
    } catch (err) {
      this.handleError('[Gateway:updateEvent]', err);
    }
  }

  async delete(eventId: string) {
    try {
      const url = `${this.config.get('EVENT_SERVICE_URL')}/event`;
      const res = await lastValueFrom(
        this.http.delete(url, {
          params: { eventId },
        }),
      );
      return res.data;
    } catch (err) {
      this.handleError('[Gateway:deleteEvent]', err);
    }
  }
}
