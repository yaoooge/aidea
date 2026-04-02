import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type { JwtUserPayload } from '../common/decorators/current-user.decorator';
import type { CreateCategoryDto } from './dto/create-category.dto';
import type { UpdateCategoryDto } from './dto/update-category.dto';

function slugify(name: string, explicit?: string) {
  if (explicit?.trim()) return explicit.trim().toLowerCase();
  return name
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9\u4e00-\u9fff-]/gi, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '') || 'category';
}

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  list(user: JwtUserPayload) {
    return this.prisma.category.findMany({
      where: { ownerUserId: user.id },
      orderBy: { updatedAt: 'desc' },
    });
  }

  async create(user: JwtUserPayload, dto: CreateCategoryDto) {
    const slug = slugify(dto.name, dto.slug);
    try {
      return await this.prisma.category.create({
        data: {
          ownerUserId: user.id,
          name: dto.name.trim(),
          slug,
          description: dto.description?.trim() ?? null,
        },
      });
    } catch {
      throw new ConflictException({ code: 'CATEGORY_SLUG_CONFLICT', message: '分类 slug 已存在' });
    }
  }

  async update(user: JwtUserPayload, id: string, dto: UpdateCategoryDto) {
    const existing = await this.prisma.category.findFirst({
      where: { id, ownerUserId: user.id },
    });
    if (!existing) throw new NotFoundException({ code: 'NOT_FOUND', message: '分类不存在' });
    const slug =
      dto.slug !== undefined || dto.name !== undefined
        ? slugify(dto.name ?? existing.name, dto.slug)
        : existing.slug;
    try {
      return await this.prisma.category.update({
        where: { id },
        data: {
          ...(dto.name !== undefined ? { name: dto.name.trim() } : {}),
          ...(dto.slug !== undefined || dto.name !== undefined ? { slug } : {}),
          ...(dto.description !== undefined ? { description: dto.description } : {}),
        },
      });
    } catch {
      throw new ConflictException({ code: 'CATEGORY_SLUG_CONFLICT', message: '分类 slug 已存在' });
    }
  }

  async remove(user: JwtUserPayload, id: string) {
    const existing = await this.prisma.category.findFirst({
      where: { id, ownerUserId: user.id },
    });
    if (!existing) throw new NotFoundException({ code: 'NOT_FOUND', message: '分类不存在' });
    const count = await this.prisma.knowledgeItem.count({
      where: { categoryId: id, ownerUserId: user.id },
    });
    if (count > 0) {
      throw new ConflictException({
        code: 'CATEGORY_IN_USE',
        message: '仍有知识条目使用该分类，无法删除',
      });
    }
    await this.prisma.category.delete({ where: { id } });
    return { deleted: true };
  }
}
