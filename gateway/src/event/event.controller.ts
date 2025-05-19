import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { EventService } from './event.service';
import { RequestWithUser } from 'src/common/interfaces/jwt.interface';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Post()
  @Roles('OPERATOR', 'ADMIN')
  async create(@Req() req: RequestWithUser, @Body() body: any) {
    return this.eventService.create(req, body);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get()
  @Roles('USER', 'OPERATOR', 'ADMIN')
  async findAll(@Query('status') status?: string) {
    return this.eventService.findAll(status);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get('detail')
  @Roles('USER', 'OPERATOR', 'ADMIN')
  async findOne(@Query('eventId') eventId: string) {
    return this.eventService.findOne(eventId);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Patch()
  @Roles('OPERATOR', 'ADMIN')
  async update(@Query('eventId') eventId: string, @Body() body: any) {
    return this.eventService.update(eventId, body);
  }
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Delete()
  @Roles('OPERATOR', 'ADMIN')
  async delete(@Query('eventId') eventId: string) {
    return this.eventService.delete(eventId);
  }
}
