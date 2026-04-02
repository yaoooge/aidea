/** 与 Prisma / 后端枚举对齐，供前端展示与校验引用 */

export const KNOWLEDGE_SOURCE_TYPES = ['web', 'book', 'course', 'other'] as const;
export type KnowledgeSourceType = (typeof KNOWLEDGE_SOURCE_TYPES)[number];

export const KNOWLEDGE_CONTENT_TYPES = ['article', 'tutorial', 'video_notes', 'cheat_sheet'] as const;
export type KnowledgeContentType = (typeof KNOWLEDGE_CONTENT_TYPES)[number];

export const DIFFICULTY_LEVELS = ['intro', 'basic', 'intermediate'] as const;
export type DifficultyLevel = (typeof DIFFICULTY_LEVELS)[number];

export const knowledgeSourceLabels: Record<KnowledgeSourceType, string> = {
  web: '网页',
  book: '书籍',
  course: '课程',
  other: '其他',
};

export const knowledgeContentLabels: Record<KnowledgeContentType, string> = {
  article: '文章',
  tutorial: '教程',
  video_notes: '视频笔记',
  cheat_sheet: '速查',
};

export const difficultyLabels: Record<DifficultyLevel, string> = {
  intro: '入门',
  basic: '基础',
  intermediate: '进阶',
};
