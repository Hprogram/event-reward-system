import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './interfaces/event.interface';
import { EventStatus } from 'src/common/constants/event.constant';

@Injectable()
export class EventService {
  constructor(
    @InjectModel('Event') private readonly eventModel: Model<Event>,
  ) {}

  async create(dto: CreateEventDto): Promise<Event> {
    try {
      const exists = await this.eventModel.findOne({ title: dto.title });
      if (exists) {
        throw new ConflictException('같은 제목의 이벤트가 이미 존재합니다.');
      }

      const created = new this.eventModel(dto);
      return await created.save();
    } catch (err) {
      console.error('[Event Create Error]', err);
      if (err instanceof ConflictException) throw err;

      throw new InternalServerErrorException(
        '이벤트 등록 중 오류가 발생했습니다.',
      );
    }
  }

  async findAll(status?: EventStatus): Promise<Event[]> {
    try {
      const filter: any = {};

      if (status && Object.values(EventStatus).includes(status)) {
        filter.status = status;
      }

      return await this.eventModel.find(filter).sort({ createdAt: -1 }).exec();
    } catch (err) {
      console.error('[Event FindAll Error]', err);
      throw new InternalServerErrorException(
        '이벤트 목록 조회 중 오류가 발생했습니다.',
      );
    }
  }

  async findOne(id: string): Promise<Event> {
    try {
      const event = await this.eventModel.findById(id).exec();
      if (!event) {
        throw new NotFoundException('이벤트가 존재하지 않습니다.');
      }
      return event;
    } catch (err) {
      console.error('[Event FindOne Error]', err);
      if (err instanceof NotFoundException) throw err;

      throw new InternalServerErrorException(
        '이벤트 조회 중 오류가 발생했습니다.',
      );
    }
  }

  async update(id: string, dto: UpdateEventDto): Promise<Event> {
    try {
      const event = await this.findOne(id);
      if (event.status === EventStatus.ACTIVE) {
        const isTryingToModifyProtectedFields =
          dto.title || dto.condition || dto.startDate || dto.endDate;

        if (isTryingToModifyProtectedFields) {
          throw new BadRequestException(
            '활성화된 이벤트는 내용을 수정할 수 없습니다.',
          );
        }
      }

      const updated = await this.eventModel
        .findByIdAndUpdate(id, dto, {
          new: true,
        })
        .exec();

      if (!updated) {
        throw new NotFoundException('이벤트가 존재하지 않습니다.');
      }

      return updated;
    } catch (err) {
      console.error('[Event Update Error]', err);
      if (
        err instanceof BadRequestException ||
        err instanceof NotFoundException
      ) {
        throw err;
      }

      throw new InternalServerErrorException(
        '이벤트 수정 중 오류가 발생했습니다.',
      );
    }
  }

  async delete(id: string): Promise<Event> {
    try {
      const event = await this.findOne(id);

      if (event.status === EventStatus.ACTIVE) {
        throw new BadRequestException('활성화된 이벤트는 삭제할 수 없습니다.');
      }

      const deleted = await this.eventModel.findByIdAndDelete(id).exec();
      if (!deleted) {
        throw new NotFoundException('이벤트가 존재하지 않습니다.');
      }

      return deleted;
    } catch (err) {
      console.error('[Event Delete Error]', err);
      if (
        err instanceof BadRequestException ||
        err instanceof NotFoundException
      )
        throw err;

      throw new InternalServerErrorException(
        '이벤트 삭제 중 오류가 발생했습니다.',
      );
    }
  }
}
