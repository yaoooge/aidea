import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ServiceUnavailableException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../common/decorators/public.decorator';
import type { JwtUserPayload } from '../common/decorators/current-user.decorator';
import { PrismaService } from '../prisma/prisma.service';

/**
 * 不做 JWT / 登录校验：每个受保护请求自动视为数据库中的 `username=admin` 用户。
 * 预留 `POST /auth/login` 供后续接入真实鉴权时再启用校验。
 */
@Injectable()
export class DefaultAdminGuard implements CanActivate {
  constructor(
    private readonly prisma: PrismaService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    const admin = await this.prisma.user.findUnique({
      where: { username: 'admin' },
      include: { userRoles: { include: { role: true } } },
    });
    if (!admin || admin.status !== 'active') {
      throw new ServiceUnavailableException({
        code: 'ADMIN_USER_MISSING',
        message: '未找到可用 admin 用户，请执行 npx prisma db seed',
      });
    }

    const req = context.switchToHttp().getRequest<{ user?: JwtUserPayload }>();
    req.user = {
      id: admin.id,
      username: admin.username,
      email: admin.email,
      roles: admin.userRoles.map((ur) => ur.role.code),
    };
    return true;
  }
}
