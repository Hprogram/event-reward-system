import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { IamService } from './iam.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginDto } from './dto/login.dto';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RequestWithUser } from 'src/common/interfaces/jwt.interface';

@Controller('iam')
export class IamController {
  constructor(private readonly iamService: IamService) {}

  @Post('register')
  register(@Body() body: RegisterUserDto) {
    return this.iamService.register(body);
  }

  @Post('login')
  login(@Body() body: LoginDto) {
    return this.iamService.login(body);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Patch('user')
  @Roles('USER', 'ADMIN')
  updateUser(@Req() req: RequestWithUser, @Body() body: UpdateUserDto) {
    return this.iamService.updateUser(req, body);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Patch('user/role')
  @Roles('ADMIN')
  updateRole(@Req() req: RequestWithUser, @Body() body: UpdateRoleDto) {
    return this.iamService.updateRole(req, body);
  }
}
