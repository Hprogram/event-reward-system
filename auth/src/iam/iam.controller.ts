import { Controller, Post, Body, Patch, Param } from '@nestjs/common';
import { IamService } from './iam.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { plainToInstance } from 'class-transformer';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

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

  @Patch('user/:sub')
  async updateUser(
    @Param('sub') sub: string,
    @Body() body: UpdateUserDto,
  ): Promise<UserResponseDto> {
    const result = await this.iamService.updateUser(sub, body);
    return plainToInstance(UserResponseDto, result, {
      excludeExtraneousValues: true,
    });
  }

  @Patch('user/:sub/role')
  async updateUserRole(
    @Param('sub') sub: string,
    @Body() body: UpdateRoleDto,
  ): Promise<UserResponseDto> {
    const result = await this.iamService.updateUserRole(sub, body);
    return plainToInstance(UserResponseDto, result, {
      excludeExtraneousValues: true,
    });
  }
}
