import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'ail_public';

/** 跳过「默认 admin 用户注入」守卫（健康检查、预留登录接口等） */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
