import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { seedEvents } from './seeder/event.seeder';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  await seedEvents(app);

  await app.listen(process.env.PORT ?? 3002);
  console.log(`🚀 Event Server running on port ${process.env.PORT ?? 3002}`);
}
bootstrap();
