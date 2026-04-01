/** 所有实体的主键类型（目前使用字符串 UUID） */
export type EntityId = string;

export const USER_ROLES = ['admin', 'member'] as const;
/** 用户角色：admin 具有管理权限，member 为普通学习者 */
export type UserRole = (typeof USER_ROLES)[number];

/**
 * AI 对话的上下文类型，与 @ail/config 中 aiToolSchema.inputMode 保持一致。
 * 注意：若此处新增类型，需同步更新 packages/config 的 aiToolSchema。
 */
export const CHAT_CONTEXT_TYPES = ['knowledge', 'note', 'free'] as const;
export type ChatContextType = (typeof CHAT_CONTEXT_TYPES)[number];
