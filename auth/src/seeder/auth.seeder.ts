import { INestApplication } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { User } from '../iam/interfaces/user.interface';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

export async function seedUsers(app: INestApplication) {
  const userModel = app.get<Model<User>>(getModelToken('User'));

  const salt = await bcrypt.genSalt();
  const hash = async (password: string) => bcrypt.hash(password, salt);

  const users = [
    {
      email: 'admin@test.com',
      password: await hash('123456'),
      role: 'ADMIN',
      nickname: '관리자',
    },
    {
      email: 'user@test.com',
      password: await hash('123456'),
      role: 'USER',
      nickname: '일반유저',
    },
    {
      email: 'operator@test.com',
      password: await hash('123456'),
      role: 'OPERATOR',
      nickname: '운영자',
    },
    {
      email: 'auditor@test.com',
      password: await hash('123456'),
      role: 'AUDITOR',
      nickname: '감사자',
    },
  ];

  for (const user of users) {
    const exists = await userModel.findOne({ email: user.email });
    if (!exists) {
      await userModel.create(user);
      console.log(`[seed] 유저 생성: ${user.email}`);
    }
  }
}
