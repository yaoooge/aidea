import { z } from 'zod';

// 导航项：key 唯一标识，path 对应 uni-app 页面路由
export const navItemSchema = z.object({
  key: z.string().min(1),
  title: z.string().min(1),
  path: z.string().min(1),
});

// Dashboard 卡片：通过 enabled 控制显示/隐藏
export const dashboardCardSchema = z.object({
  key: z.string().min(1),
  title: z.string().min(1),
  enabled: z.boolean(),
});

// AI 工具：inputMode 决定工具的输入上下文类型
export const aiToolSchema = z.object({
  key: z.string().min(1),
  title: z.string().min(1),
  inputMode: z.enum(['knowledge', 'note', 'free']),
});

export const appShellConfigSchema = z.object({
  navigation: z.array(navItemSchema),
  dashboardCards: z.array(dashboardCardSchema),
  aiTools: z.array(aiToolSchema),
});

// 从 schema 推断类型，确保类型与运行时校验保持同步
export type AppShellConfigParsed = z.infer<typeof appShellConfigSchema>;
export type NavItemConfig = z.infer<typeof navItemSchema>;
export type DashboardCardConfig = z.infer<typeof dashboardCardSchema>;
export type AiToolConfig = z.infer<typeof aiToolSchema>;
