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
  { key: 'dashboard', title: 'Dashboard', path: '/pages/dashboard/index' },
  { key: 'knowledge', title: 'Knowledge', path: '/pages/knowledge/index' },
  { key: 'notes', title: 'Notes', path: '/pages/notes/index' },
  { key: 'experiments', title: 'Experiments', path: '/pages/experiments/index' },
  { key: 'chat', title: 'AI Chat', path: '/pages/chat/index' }
];

export const dashboardCardConfig: DashboardCardConfig[] = [
  { key: 'overview', title: '学习概览', enabled: true },
  { key: 'recent-knowledge', title: '最近知识', enabled: true },
  { key: 'recent-experiments', title: '最近实验', enabled: true }
];

export const aiToolConfig: AiToolConfig[] = [
  { key: 'summarize-knowledge', title: '总结知识点', inputMode: 'knowledge' },
  { key: 'explain-concept', title: '解释概念', inputMode: 'free' },
  { key: 'generate-plan', title: '生成学习计划', inputMode: 'note' }
];
