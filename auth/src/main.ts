import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { seedUsers } from './seeder/auth.seeder';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  await seedUsers(app);

  await app.listen(process.env.PORT ?? 3001);
  console.log(`🚀 Auth Server running on port ${process.env.PORT ?? 3001}`);
}
bootstrap();
