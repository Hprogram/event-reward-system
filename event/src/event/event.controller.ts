import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { EventStatus } from 'src/common/constants/event.constant';
import { CreateEventDto } from './dto/create-event.dto';
import { EventResponseDto } from './dto/event-response.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventService } from './event.service';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  async create(@Body() dto: CreateEventDto): Promise<EventResponseDto> {
    const result = await this.eventService.create(dto);
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

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<EventResponseDto> {
    const result = await this.eventService.findOne(id);
    return plainToInstance(EventResponseDto, result, {
      excludeExtraneousValues: true,
    });
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateEventDto,
  ): Promise<EventResponseDto> {
    const result = await this.eventService.update(id, dto);
    return plainToInstance(EventResponseDto, result, {
      excludeExtraneousValues: true,
    });
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<EventResponseDto> {
    const result = await this.eventService.delete(id);
    return plainToInstance(EventResponseDto, result, {
      excludeExtraneousValues: true,
    });
  }
}
