import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api');
  app.use(cookieParser());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
/*
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/mirzayevmuhammad/homework14.git
git push -u origin main
*/