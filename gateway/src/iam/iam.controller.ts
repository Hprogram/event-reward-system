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
  @Patch('user/:id')
  @Roles('USER', 'ADMIN')
  updateUser(
    @Param('id') id: string,
    @Body() body: UpdateUserDto,
    @Req() req: Request,
  ) {
    return this.iamService.updateUser(id, req.headers.authorization, body);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Patch('user/:id/role')
  @Roles('ADMIN')
  updateRole(
    @Param('id') id: string,
    @Body() body: UpdateRoleDto,
    @Req() req: Request,
  ) {
    return this.iamService.updateRole(id, req.headers.authorization, body);
  }
}
