import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 优先读取环境变量 PORT，默认 3000
  const port = process.env.PORT ? Number(process.env.PORT) : 3000;
  await app.listen(port);
}

// 捕获启动异常，避免无声失败导致进程挂起
bootstrap().catch((err) => {
  console.error('Application failed to start:', err);
  process.exit(1);
});
