import { Injectable } from '@nestjs/common';
import { getLearningEntry } from '@ail/config';
import type { JwtUserPayload } from '../common/decorators/current-user.decorator';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LearningService {
  constructor(private readonly prisma: PrismaService) {}

  async getEntry(user: JwtUserPayload) {
    const row = await this.prisma.user.findUnique({
      where: { id: user.id },
      select: { preferences: true },
    });
    const prefs = row?.preferences as { preferredDirection?: string } | null;
    const preferredDirection = prefs?.preferredDirection ?? 'ai-agent';

    return getLearningEntry(preferredDirection);
  }
}
