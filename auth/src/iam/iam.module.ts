import { Module } from '@nestjs/common';
import { IamService } from './iam.service';
import { IamController } from './iam.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/iam.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  providers: [IamService],
  controllers: [IamController],
})
export class IamModule {}
