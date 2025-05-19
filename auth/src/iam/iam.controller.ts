import { Controller, Post, Body, Patch, Param, Req } from '@nestjs/common';
import { IamService } from './iam.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { plainToInstance } from 'class-transformer';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import type { Request } from 'express';

@Controller('iam')
export class IamController {
  constructor(private readonly iamService: IamService) {}

  @Post('register')
  async register(@Body() body: RegisterUserDto): Promise<UserResponseDto> {
    const result = await this.iamService.register(body);
    return plainToInstance(UserResponseDto, result, {
      excludeExtraneousValues: true,
    });
  }

  @Post('login')
  async login(@Body() body: LoginDto): Promise<LoginResponseDto> {
    const result = await this.iamService.login(body);
    return plainToInstance(LoginResponseDto, result, {
      excludeExtraneousValues: true,
    });
  }

  @Patch('user')
  async updateUser(
    @Body() body: UpdateUserDto,
    @Req() req: Request,
  ): Promise<UserResponseDto> {
    const userId = req.headers['x-user-sub'] as string;

    console.log(userId);

    const result = await this.iamService.updateUser(userId, body);
    return plainToInstance(UserResponseDto, result, {
      excludeExtraneousValues: true,
    });
  }

  @Patch('user/role')
  async updateUserRole(
    @Body() body: UpdateRoleDto,
    @Req() req: Request,
  ): Promise<UserResponseDto> {
    const userId = req.headers['x-user-sub'] as string;

    const result = await this.iamService.updateUserRole(userId, body);
    return plainToInstance(UserResponseDto, result, {
      excludeExtraneousValues: true,
    });
  }
}
