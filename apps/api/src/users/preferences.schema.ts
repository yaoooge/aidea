import { z } from 'zod';

/** 与 docs/ai-agent-learning-path.md 对齐，字段均可选；整对象替换时未传字段会丢失 */
export const userPreferencesSchema = z
  .object({
    background: z.enum(['frontend-engineer', 'backend-engineer', 'generalist']).optional(),
    goal: z.enum(['job-switch', 'skill-upgrade']).optional(),
    preferredDirection: z.enum(['ai-agent', 'general']).optional(),
    pace: z.enum(['light', 'normal', 'intensive']).optional(),
  })
  .strict();

export type UserPreferences = z.infer<typeof userPreferencesSchema>;
