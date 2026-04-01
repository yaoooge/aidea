export type EntityId = string;

export const USER_ROLES = ['admin', 'member'] as const;

export type UserRole = (typeof USER_ROLES)[number];

export const CHAT_CONTEXT_TYPES = ['knowledge', 'note', 'free'] as const;

export type ChatContextType = (typeof CHAT_CONTEXT_TYPES)[number];
