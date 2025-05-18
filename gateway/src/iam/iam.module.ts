import { Module } from '@nestjs/common';
import { IamController } from './iam.controller';
import { HttpModule } from '@nestjs/axios';
import { IamService } from './iam.service';

@Module({
  imports: [HttpModule],
  controllers: [IamController],
  providers: [IamService],
})
export class IamModule {}
