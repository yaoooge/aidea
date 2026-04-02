import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import type { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { username: dto.username },
      include: { userRoles: { include: { role: true } } },
    });
    if (!user || user.status !== 'active') {
      throw new UnauthorizedException({ code: 'AUTH_INVALID', message: '用户名或密码错误' });
    }
    const ok = await bcrypt.compare(dto.password, user.passwordHash);
    if (!ok) {
      throw new UnauthorizedException({ code: 'AUTH_INVALID', message: '用户名或密码错误' });
    }
    const roles = user.userRoles.map((ur) => ur.role.code);
    const accessToken = await this.jwt.signAsync({
      sub: user.id,
      username: user.username,
      email: user.email,
      roles,
    });
    return {
      accessToken,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        displayName: user.displayName,
        roles,
      },
    };
  }
}
