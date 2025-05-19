import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { RequestWithUser } from 'src/common/interfaces/jwt.interface';
import { RewardRequestService } from './reward-request.service';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('reward-request')
export class RewardRequestController {
  constructor(private readonly rewardRequestService: RewardRequestService) {}

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Post()
  @Roles('USER', 'ADMIN')
  async create(@Req() req: RequestWithUser, @Body() body: any) {
    const userId = req.user.sub;
    return this.rewardRequestService.create(userId, body);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get()
  @Roles('OPERATOR', 'AUDITOR', 'ADMIN')
  async findAll(
    @Query('userId') userId?: string,
    @Query('eventId') eventId?: string,
    @Query('status') status?: string,
  ) {
    return this.rewardRequestService.findAll({ userId, eventId, status });
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get('me')
  @Roles('USER', 'ADMIN')
  async findMyRequests(@Req() req: RequestWithUser) {
    const userId = req.user.sub;
    return this.rewardRequestService.findMyRequests(userId);
  }
}
