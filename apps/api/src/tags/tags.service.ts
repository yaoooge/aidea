import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type { JwtUserPayload } from '../common/decorators/current-user.decorator';
import type { CreateTagDto } from './dto/create-tag.dto';
import type { UpdateTagDto } from './dto/update-tag.dto';

@Injectable()
export class TagsService {
  constructor(private readonly prisma: PrismaService) {}

  list(user: JwtUserPayload) {
    return this.prisma.tag.findMany({
      where: { ownerUserId: user.id },
      orderBy: { updatedAt: 'desc' },
    });
  }

  async create(user: JwtUserPayload, dto: CreateTagDto) {
    try {
      return await this.prisma.tag.create({
        data: {
          ownerUserId: user.id,
          name: dto.name.trim(),
          color: dto.color ?? null,
        },
      });
    } catch {
      throw new ConflictException({ code: 'TAG_NAME_CONFLICT', message: '标签名已存在' });
    }
  }

  async update(user: JwtUserPayload, id: string, dto: UpdateTagDto) {
    const existing = await this.prisma.tag.findFirst({
      where: { id, ownerUserId: user.id },
    });
    if (!existing) throw new NotFoundException({ code: 'NOT_FOUND', message: '标签不存在' });
    try {
      return await this.prisma.tag.update({
        where: { id },
        data: {
          ...(dto.name !== undefined ? { name: dto.name.trim() } : {}),
          ...(dto.color !== undefined ? { color: dto.color } : {}),
        },
      });
    } catch {
      throw new ConflictException({ code: 'TAG_NAME_CONFLICT', message: '标签名已存在' });
    }
  }

  async remove(user: JwtUserPayload, id: string) {
    const existing = await this.prisma.tag.findFirst({
      where: { id, ownerUserId: user.id },
    });
    if (!existing) throw new NotFoundException({ code: 'NOT_FOUND', message: '标签不存在' });
    await this.prisma.tag.delete({ where: { id } });
    return { deleted: true };
  }
}
