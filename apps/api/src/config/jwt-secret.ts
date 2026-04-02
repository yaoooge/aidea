import { ConfigService } from '@nestjs/config';

/** 生产环境必须配置 JWT_SECRET；开发环境可用 .env.development 或此处回退 */
export function resolveJwtSecret(config: ConfigService): string {
  const fromEnv = config.get<string>('JWT_SECRET');
  if (fromEnv?.trim()) return fromEnv.trim();
  if (process.env.NODE_ENV === 'production') {
    throw new Error(
      'JWT_SECRET 未设置：生产环境必须在环境变量中配置足够长的随机密钥',
    );
  }
  return 'development-jwt-secret-min-32-characters!!';
}
