import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { IamModule } from './iam/iam.module';
import { EventModule } from './event/event.module';
import { RewardModule } from './reward/reward.module';
import { RewardRequestModule } from './reward-request/reward-request.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    AuthModule,
    IamModule,
    EventModule,
    RewardModule,
    RewardRequestModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
