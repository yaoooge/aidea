import {
  IsArray,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import {
  DifficultyLevel,
  KnowledgeContentType,
  KnowledgeSourceType,
} from '@prisma/client';

export class CreateKnowledgeDto {
  @IsString()
  @MinLength(1)
  @MaxLength(500)
  title!: string;

  @IsOptional()
  @IsString()
  @MaxLength(5000)
  summary?: string;

  @IsString()
  @MinLength(1)
  content!: string;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  sourceUrl?: string;

  @IsEnum(KnowledgeSourceType)
  sourceType!: KnowledgeSourceType;

  @IsEnum(KnowledgeContentType)
  contentType!: KnowledgeContentType;

  @IsEnum(DifficultyLevel)
  difficulty!: DifficultyLevel;

  @IsOptional()
  @IsString()
  categoryId?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tagIds?: string[];
}
