import { Controller, Post, Body } from '@nestjs/common';
import { IamService } from './iam.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { plainToInstance } from 'class-transformer';

@Controller('iam')
export class IamController {
  constructor(private readonly iamService: IamService) {}

  @Post('register')
  async register(@Body() body: RegisterUserDto): Promise<UserResponseDto> {
    const user = await this.iamService.register(body);
    return plainToInstance(UserResponseDto, user, {
      excludeExtraneousValues: true,
    });
  }
}
