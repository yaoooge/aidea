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

export class UpdateKnowledgeDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(500)
  title?: string;

  @IsOptional()
  @IsString()
  @MaxLength(5000)
  summary?: string | null;

  @IsOptional()
  @IsString()
  @MinLength(1)
  content?: string;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  sourceUrl?: string | null;

  @IsOptional()
  @IsEnum(KnowledgeSourceType)
  sourceType?: KnowledgeSourceType;

  @IsOptional()
  @IsEnum(KnowledgeContentType)
  contentType?: KnowledgeContentType;

  @IsOptional()
  @IsEnum(DifficultyLevel)
  difficulty?: DifficultyLevel;

  @IsOptional()
  @IsString()
  categoryId?: string | null;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tagIds?: string[];
}
