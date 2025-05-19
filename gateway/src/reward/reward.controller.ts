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
import { RewardService } from './reward.service';
import { RequestWithUser } from 'src/common/interfaces/jwt.interface';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('reward')
export class RewardController {
  constructor(private readonly rewardService: RewardService) {}

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Post()
  @Roles('OPERATOR', 'ADMIN')
  async create(@Req() req: RequestWithUser, @Body() body: any) {
    return this.rewardService.create(req, body);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get()
  @Roles('OPERATOR', 'ADMIN')
  async findAll(@Query('eventId') eventId: string) {
    return this.rewardService.findAllByEventId(eventId);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Patch()
  @Roles('OPERATOR', 'ADMIN')
  async update(@Query('rewardId') rewardId: string, @Body() body: any) {
    return this.rewardService.update(rewardId, body);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Delete()
  @Roles('OPERATOR', 'ADMIN')
  async delete(@Query('rewardId') rewardId: string) {
    return this.rewardService.delete(rewardId);
  }
}
