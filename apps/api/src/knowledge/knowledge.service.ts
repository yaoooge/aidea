import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import type { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import type { JwtUserPayload } from '../common/decorators/current-user.decorator';
import type { CreateKnowledgeDto } from './dto/create-knowledge.dto';
import type { UpdateKnowledgeDto } from './dto/update-knowledge.dto';
import type { ListKnowledgeQueryDto } from './dto/list-knowledge.query';

const knowledgeInclude = {
  category: true,
  tags: { include: { tag: true } },
} satisfies Prisma.KnowledgeItemInclude;

@Injectable()
export class KnowledgeService {
  constructor(private readonly prisma: PrismaService) {}

  private async assertTagsOwned(userId: string, tagIds: string[]) {
    if (!tagIds.length) return;
    const n = await this.prisma.tag.count({
      where: { ownerUserId: userId, id: { in: tagIds } },
    });
    if (n !== tagIds.length) {
      throw new BadRequestException({ code: 'INVALID_TAGS', message: '包含无效标签' });
    }
  }

  private async assertCategoryOwned(userId: string, categoryId: string | null | undefined) {
    if (categoryId == null || categoryId === '') return;
    const c = await this.prisma.category.findFirst({
      where: { id: categoryId, ownerUserId: userId },
    });
    if (!c) {
      throw new BadRequestException({ code: 'INVALID_CATEGORY', message: '分类不存在' });
    }
  }

  async list(user: JwtUserPayload, query: ListKnowledgeQueryDto) {
    const page = query.page ?? 1;
    const pageSize = Math.min(query.pageSize ?? 20, 100);
    const where: Prisma.KnowledgeItemWhereInput = { ownerUserId: user.id };
    if (query.categoryId) where.categoryId = query.categoryId;
    if (query.tagId) where.tags = { some: { tagId: query.tagId } };
    const q = query.q?.trim();
    if (q) {
      where.OR = [
        { title: { contains: q, mode: 'insensitive' } },
        { summary: { contains: q, mode: 'insensitive' } },
      ];
    }
    const [total, items] = await this.prisma.$transaction([
      this.prisma.knowledgeItem.count({ where }),
      this.prisma.knowledgeItem.findMany({
        where,
        include: knowledgeInclude,
        orderBy: { updatedAt: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
    ]);
    return { items, total, page, pageSize };
  }

  async getById(user: JwtUserPayload, id: string) {
    const item = await this.prisma.knowledgeItem.findFirst({
      where: { id, ownerUserId: user.id },
      include: knowledgeInclude,
    });
    if (!item) throw new NotFoundException({ code: 'NOT_FOUND', message: '知识条目不存在' });
    return item;
  }

  async create(user: JwtUserPayload, dto: CreateKnowledgeDto) {
    const tagIds = dto.tagIds ?? [];
    await this.assertCategoryOwned(user.id, dto.categoryId ?? null);
    await this.assertTagsOwned(user.id, tagIds);
    return this.prisma.knowledgeItem.create({
      data: {
        title: dto.title.trim(),
        summary: dto.summary?.trim() ?? null,
        content: dto.content,
        sourceUrl: dto.sourceUrl?.trim() ?? null,
        sourceType: dto.sourceType,
        contentType: dto.contentType,
        difficulty: dto.difficulty,
        categoryId: dto.categoryId ?? null,
        ownerUserId: user.id,
        visibility: 'private',
        tags: {
          create: tagIds.map((tagId) => ({ tagId })),
        },
      },
      include: knowledgeInclude,
    });
  }

  async update(user: JwtUserPayload, id: string, dto: UpdateKnowledgeDto) {
    const existing = await this.prisma.knowledgeItem.findFirst({
      where: { id, ownerUserId: user.id },
    });
    if (!existing) throw new NotFoundException({ code: 'NOT_FOUND', message: '知识条目不存在' });
    if (dto.categoryId !== undefined) {
      await this.assertCategoryOwned(
        user.id,
        dto.categoryId === null ? null : dto.categoryId,
      );
    }
    if (dto.tagIds !== undefined) {
      await this.assertTagsOwned(user.id, dto.tagIds);
    }

    const { tagIds, ...rest } = dto;
    const data: Prisma.KnowledgeItemUpdateInput = {
      ...(rest.title !== undefined ? { title: rest.title.trim() } : {}),
      ...(rest.summary !== undefined ? { summary: rest.summary } : {}),
      ...(rest.content !== undefined ? { content: rest.content } : {}),
      ...(rest.sourceUrl !== undefined ? { sourceUrl: rest.sourceUrl } : {}),
      ...(rest.sourceType !== undefined ? { sourceType: rest.sourceType } : {}),
      ...(rest.contentType !== undefined ? { contentType: rest.contentType } : {}),
      ...(rest.difficulty !== undefined ? { difficulty: rest.difficulty } : {}),
      ...(rest.categoryId !== undefined ? { categoryId: rest.categoryId } : {}),
    };

    if (tagIds !== undefined) {
      data.tags = {
        deleteMany: {},
        create: tagIds.map((tid) => ({ tagId: tid })),
      };
    }

    return this.prisma.knowledgeItem.update({
      where: { id },
      data,
      include: knowledgeInclude,
    });
  }

  async remove(user: JwtUserPayload, id: string) {
    const existing = await this.prisma.knowledgeItem.findFirst({
      where: { id, ownerUserId: user.id },
    });
    if (!existing) throw new NotFoundException({ code: 'NOT_FOUND', message: '知识条目不存在' });
    await this.prisma.knowledgeItem.delete({ where: { id } });
    return { deleted: true };
  }
}
