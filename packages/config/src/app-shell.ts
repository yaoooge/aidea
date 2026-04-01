import { type ZodError } from 'zod';
import { appShellConfigSchema, type AppShellConfigParsed } from './schemas/app-shell.js';

/**
 * 内嵌的默认配置原始数据（M1 阶段，后续可替换为文件/远程加载）。
 * 使用 `as const` 保留字面量类型，配合 Zod parse 做运行时校验。
 */
export const appShellConfigRaw = {
  navigation: [
    { key: 'dashboard', title: 'Dashboard', path: '/pages/dashboard/index' },
    { key: 'knowledge', title: 'Knowledge', path: '/pages/knowledge/index' },
    { key: 'notes', title: 'Notes', path: '/pages/notes/index' },
    { key: 'experiments', title: 'Experiments', path: '/pages/experiments/index' },
    { key: 'chat', title: 'AI Chat', path: '/pages/chat/index' },
  ],
  dashboardCards: [
    { key: 'overview', title: '学习概览', enabled: true },
    { key: 'recent-knowledge', title: '最近知识', enabled: true },
    { key: 'recent-experiments', title: '最近实验', enabled: true },
  ],
  aiTools: [
    { key: 'summarize-knowledge', title: '总结知识点', inputMode: 'knowledge' as const },
    { key: 'explain-concept', title: '解释概念', inputMode: 'free' as const },
    { key: 'generate-plan', title: '生成学习计划', inputMode: 'note' as const },
  ],
} as const;

/** 校验不通过时直接抛出 ZodError，适合启动时的强制断言 */
export function validateAppShellConfig(input: unknown): AppShellConfigParsed {
  return appShellConfigSchema.parse(input);
}

/**
 * 安全解析版本：不抛异常，返回联合类型结果。
 * 适合运行时动态加载（如远程配置）需要容错处理的场景。
 */
export function safeParseAppShellConfig(
  input: unknown
): { success: true; data: AppShellConfigParsed } | { success: false; error: ZodError } {
  const r = appShellConfigSchema.safeParse(input);
  if (r.success) return { success: true, data: r.data };
  return { success: false, error: r.error };
}

// 模块内单例缓存，避免每次调用重复执行 Zod parse
let cached: AppShellConfigParsed | undefined;

/** 返回校验后的应用壳配置（首次调用时解析并缓存） */
export function getAppShellConfig(): AppShellConfigParsed {
  if (!cached) {
    cached = validateAppShellConfig(appShellConfigRaw);
  }
  return cached;
}

/** 仅用于测试：清除缓存以便重新加载配置 */
export function resetAppShellConfigCache(): void {
  cached = undefined;
}
