import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { EventStatus } from 'src/common/constants/event.constant';
import { CreateEventDto } from './dto/create-event.dto';
import { EventResponseDto } from './dto/event-response.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventService } from './event.service';
import type { Request } from 'express';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  async create(
    @Req() req: Request,
    @Body() dto: CreateEventDto,
  ): Promise<EventResponseDto> {
    const userId = req.headers['x-user-sub'] as string;

    const result = await this.eventService.create(userId, dto);
    return plainToInstance(EventResponseDto, result, {
      excludeExtraneousValues: true,
    });
  }

  @Get()
  async findAll(
    @Query('status') status?: EventStatus,
  ): Promise<EventResponseDto[]> {
    const result = await this.eventService.findAll(status);
    return plainToInstance(EventResponseDto, result, {
      excludeExtraneousValues: true,
    });
  }

  @Get('detail')
  async findOne(@Query('eventId') eventId: string): Promise<EventResponseDto> {
    const result = await this.eventService.findOne(eventId);
    return plainToInstance(EventResponseDto, result, {
      excludeExtraneousValues: true,
    });
  }

  @Patch()
  async update(
    @Query('eventId') eventId: string,
    @Body() dto: UpdateEventDto,
  ): Promise<EventResponseDto> {
    const result = await this.eventService.update(eventId, dto);
    return plainToInstance(EventResponseDto, result, {
      excludeExtraneousValues: true,
    });
  }

  @Delete()
  async delete(@Query('eventId') eventId: string): Promise<EventResponseDto> {
    const result = await this.eventService.delete(eventId);
    return plainToInstance(EventResponseDto, result, {
      excludeExtraneousValues: true,
    });
  }
}
