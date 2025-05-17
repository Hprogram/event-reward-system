import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './interfaces/user.interface';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class IamService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    private configService: ConfigService,
  ) {}

  async register({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<User> {
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
}
