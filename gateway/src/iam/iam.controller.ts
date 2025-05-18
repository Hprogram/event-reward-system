import { Body, Controller, Param, Patch, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { IamService } from './iam.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginDto } from './dto/login.dto';

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

  @Patch('user/:id')
  updateUser(
    @Param('id') id: string,
    @Body() body: UpdateUserDto,
    @Req() req: Request,
  ) {
    return this.iamService.updateUser(id, req.headers.authorization, body);
  }

  @Patch('user/:id/role')
  updateRole(
    @Param('id') id: string,
    @Body() body: UpdateRoleDto,
    @Req() req: Request,
  ) {
    return this.iamService.updateRole(id, req.headers.authorization, body);
  }
}
