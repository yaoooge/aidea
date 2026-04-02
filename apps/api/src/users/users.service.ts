import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { userPreferencesSchema } from './preferences.schema';
import type { JwtUserPayload } from '../common/decorators/current-user.decorator';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getMe(user: JwtUserPayload) {
    const row = await this.prisma.user.findUniqueOrThrow({
      where: { id: user.id },
      select: {
        id: true,
        username: true,
        email: true,
        displayName: true,
        status: true,
        preferences: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return row;
  }

  async patchMe(user: JwtUserPayload, preferences: Record<string, unknown>) {
    const parsed = userPreferencesSchema.safeParse(preferences);
    if (!parsed.success) {
      throw new BadRequestException({
        code: 'INVALID_PREFERENCES',
        message: parsed.error.flatten().fieldErrors,
      });
    }
    return this.prisma.user.update({
      where: { id: user.id },
      data: { preferences: parsed.data as object },
      select: {
        id: true,
        username: true,
        email: true,
        displayName: true,
        status: true,
        preferences: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }
}
