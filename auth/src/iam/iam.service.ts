import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './interfaces/user.interface';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginResponseDto } from './dto/login-response.dto';

@Injectable()
export class IamService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async register({
    email,
    password,
    nickname,
  }: RegisterUserDto): Promise<User> {
    try {
      const existing = await this.userModel.findOne({ email });
      if (existing) {
        throw new ConflictException('이미 등록된 이메일입니다.');
      }

      const saltRoundsStr =
        this.configService.get<string>('BCRYPT_SALT_ROUNDS') || '10';
      const saltRounds = Number(saltRoundsStr);

      if (isNaN(saltRounds) || saltRounds <= 0) {
        throw new Error('Invalid BCRYPT_SALT_ROUNDS value in .env');
      }

      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const user = new this.userModel({
        email,
        password: hashedPassword,
        role: 'USER',
        nickname,
      });

      return await user.save();
    } catch (err) {
      if (err instanceof ConflictException) throw err;

      console.error('[Register Error]', err);
      throw new InternalServerErrorException(
        '회원가입 처리 중 오류가 발생했습니다.',
      );
    }
  }

  async login({ email, password }: LoginDto): Promise<LoginResponseDto> {
    try {
      const user = await this.userModel.findOne({ email });

      if (!user)
        throw new UnauthorizedException('잘못된 이메일 또는 비밀번호입니다.');

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        throw new UnauthorizedException('잘못된 이메일 또는 비밀번호입니다.');

      const payload = {
        sub: user._id.toString(),
        email: user.email,
        role: user.role,
        nickname: user.nickname,
      };

      const token = this.jwtService.sign(payload);

      return {
        _id: user._id.toString(),
        email: user.email,
        role: user.role,
        nickname: user.nickname,
        accessToken: token,
      };
    } catch (err) {
      if (err instanceof UnauthorizedException) throw err;
      console.error('[Login Error]', err);
      throw new InternalServerErrorException('로그인 중 오류가 발생했습니다.');
    }
  }

  async updateUser(userId: string, { nickname }: UpdateUserDto): Promise<User> {
    try {
      const updated = await this.userModel.findByIdAndUpdate(
        userId,
        { nickname: nickname },
        {
          new: true,
          select: '-password',
        },
      );

      if (!updated) {
        throw new NotFoundException('사용자를 찾을 수 없습니다.');
      }

      return updated;
    } catch (err) {
      console.error('[User Update Error]', err);
      throw err instanceof NotFoundException
        ? err
        : new InternalServerErrorException(
            '유저 정보 수정 중 오류가 발생했습니다.',
          );
    }
  }
}
