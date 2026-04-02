import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { DefaultAdminGuard } from './auth/default-admin.guard';
import { CategoriesModule } from './categories/categories.module';
import { HealthModule } from './health/health.module';
import { KnowledgeModule } from './knowledge/knowledge.module';
import { LearningModule } from './learning/learning.module';
import { PrismaModule } from './prisma/prisma.module';
import { TagsModule } from './tags/tags.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // 先读 .env（用户私有），再读 .env.development（仓库内本地默认）
      envFilePath: ['.env', '.env.development'],
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    LearningModule,
    CategoriesModule,
    TagsModule,
    KnowledgeModule,
    HealthModule,
  ],
  providers: [{ provide: APP_GUARD, useClass: DefaultAdminGuard }],
})
export class AppModule {}
