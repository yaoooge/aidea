export interface NavItemConfig {
  key: string;
  title: string;
  path: string;
}

export interface DashboardCardConfig {
  key: string;
  title: string;
  enabled: boolean;
}

export interface AiToolConfig {
  key: string;
  title: string;
  inputMode: 'knowledge' | 'note' | 'free';
}

export const navigationConfig: NavItemConfig[] = [
  { key: 'dashboard', title: '首页', path: '/pages/index/index' },
  { key: 'learning', title: '学习路径', path: '/pages/learning/index' },
  { key: 'knowledge', title: '知识', path: '/pages/knowledge/index' },
  { key: 'settings', title: '偏好', path: '/pages/settings/preferences' },
  { key: 'notes', title: '笔记', path: '/pages/notes/index' },
  { key: 'experiments', title: '实验', path: '/pages/experiments/index' },
  { key: 'chat', title: 'AI Chat', path: '/pages/chat/index' },
];

export const dashboardCardConfig: DashboardCardConfig[] = [
  { key: 'overview', title: '学习概览', enabled: true },
  { key: 'recent-knowledge', title: '最近知识', enabled: true },
  { key: 'recent-experiments', title: '最近实验', enabled: true }
];

export const aiToolConfig: AiToolConfig[] = [
  { key: 'summarize-knowledge', title: '总结知识点', inputMode: 'knowledge' },
  { key: 'explain-concept', title: '解释概念', inputMode: 'free' },
  { key: 'generate-plan', title: '生成学习计划', inputMode: 'note' },
];

export * from './knowledge-meta';
export * from './learning-path';
