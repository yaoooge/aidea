/** 学习路径静态注册表 — 与 docs/ai-agent-learning-path.md 阶段一致，供 GET /learning/entry 与用户端展示 */

export type LearningDirectionKey = 'ai-agent' | 'general';

export interface LearningModuleRef {
  key: string;
  title: string;
}

export interface LearningStageRef {
  key: string;
  title: string;
  modules: LearningModuleRef[];
}

export interface LearningPathMeta {
  key: string;
  title: string;
  summary: string;
  isDefault: boolean;
}

const AI_AGENT_MAIN: LearningPathMeta = {
  key: 'ai-agent-main',
  title: 'AI Agent 成长主线',
  summary: '面向求职与应用开发的 AI Agent 学习路径',
  isDefault: true,
};

const AI_AGENT_STAGES: LearningStageRef[] = [
  {
    key: 'ai-foundation',
    title: 'AI 认知打底',
    modules: [
      { key: 'ai-llm-agent-overview', title: 'AI、AIGC、LLM、Agent 概览' },
      { key: 'ai-app-landscape', title: 'AI 应用开发全景图' },
      { key: 'fe-to-ai-transition', title: '从前端到 AI 应用的能力迁移' },
    ],
  },
  {
    key: 'llm-prompt',
    title: 'LLM 与 Prompt 基础',
    modules: [
      { key: 'llm-capabilities', title: 'LLM 能力与局限' },
      { key: 'prompt-basics', title: 'Prompt 基础写法' },
      { key: 'structured-output', title: '结构化输出与模板' },
    ],
  },
  {
    key: 'agent-core',
    title: 'Agent 核心概念',
    modules: [
      { key: 'what-is-agent', title: '什么是 Agent' },
      { key: 'tool-calling', title: 'Tool Calling' },
      { key: 'memory-planning', title: 'Memory / Planning / Workflow' },
    ],
  },
  {
    key: 'agent-practice',
    title: 'Agent 应用实战',
    modules: [
      { key: 'single-agent-demo', title: '单 Agent Demo 拆解' },
      { key: 'workflow-orchestration', title: '工作流编排入门' },
    ],
  },
  {
    key: 'job-readiness',
    title: '岗位准备与作品沉淀',
    modules: [
      { key: 'portfolio', title: '作品与项目包装' },
      { key: 'interview-faq', title: '常见面试与表达' },
    ],
  },
];

/** ai-agent 方向下用于高亮展示的模块 key（突出 Agent 主线） */
const AI_AGENT_HIGHLIGHT_KEYS = [
  'what-is-agent',
  'tool-calling',
  'single-agent-demo',
  'workflow-orchestration',
];

export interface LearningEntryPayload {
  direction: LearningDirectionKey;
  path: LearningPathMeta;
  stages: LearningStageRef[];
  highlight: string[];
}

function normalizeDirection(raw: string | undefined | null): LearningDirectionKey {
  if (raw === 'general') return 'general';
  return 'ai-agent';
}

/**
 * 聚合学习入口数据（不访问数据库）。
 * - `ai-agent`：默认路径 + Agent 相关模块高亮
 * - `general`：同一路径全文展示，无高亮
 */
export function getLearningEntry(preferredDirection?: string | null): LearningEntryPayload {
  const direction = normalizeDirection(preferredDirection ?? undefined);
  const path = AI_AGENT_MAIN;
  const stages = AI_AGENT_STAGES;
  if (direction === 'general') {
    return { direction, path, stages, highlight: [] };
  }
  return {
    direction: 'ai-agent',
    path,
    stages,
    highlight: [...AI_AGENT_HIGHLIGHT_KEYS],
  };
}
