import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    try {
      await this.$connect();
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      throw new Error(
        `Prisma 无法连接数据库（检查 DATABASE_URL 与 PostgreSQL 是否已启动）：${msg}`,
      );
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
