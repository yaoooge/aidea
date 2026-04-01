# AIdea · AI Agent 学习路径配置草案

## 1. 文档目标

本文档用于定义 `AIdea` 首版 `AI Agent` 学习路径的配置草案，服务于以下目标：

- 为用户提供一条清晰、循序渐进的 AI Agent 学习路线
- 匹配“有前端开发经验，但缺乏系统 AI 学习经历”的目标用户画像
- 支持根据用户偏好动态展示学习路径
- 为前端配置驱动渲染和后端进度计算提供统一结构

## 2. 路径设计原则

- 首期以 `岗位导向` 和 `应用导向` 为核心，不追求过深的底层理论
- 优先建立对 `LLM`、`Prompt`、`Agent`、`工具调用`、`工作流` 的整体认知
- 每个阶段都应有明确产出，避免只学概念没有结果
- 学习内容支持配置扩展，后续可以新增 `RAG`、`多 Agent`、`评测` 等方向
- 路径结构尽量稳定，具体学习内容可迭代替换

## 3. 目标用户画像

当前默认用户画像：

- 有前端开发经验
- 熟悉基础编程概念与工程化开发
- 想系统理解 AI 应用开发
- 求职方向偏向 `AI Agent`
- 不要求先掌握复杂数学推导或模型训练原理

## 4. 学习路径总览

首版建议将 `AI Agent` 学习路径拆为 5 个阶段：

1. `AI 认知打底`
2. `LLM 与 Prompt 基础`
3. `Agent 核心概念`
4. `Agent 应用实战`
5. `岗位准备与作品沉淀`

## 5. 阶段设计

## 5.1 阶段一：AI 认知打底

### 阶段目标

帮助用户快速建立对 AI、生成式 AI、LLM、Agent 的整体认识，知道各概念之间的关系。

### 模块列表

- 什么是 AI、AIGC、LLM、Agent
- AI 应用开发全景图
- 从前端开发到 AI 应用开发的能力迁移

### 完成标准

- 能用自己的话解释 `LLM` 和 `Agent` 的区别
- 能描述一个 AI 应用的大致组成
- 能明确自己为什么要学习 `AI Agent`

### 推荐产出

- 一篇“AI 学习定位”笔记
- 一张 AI 应用架构理解图

### 经验值建议

- 完成阶段：`80 EXP`

## 5.2 阶段二：LLM 与 Prompt 基础

### 阶段目标

让用户理解 Agent 的“脑子”从哪里来，建立对提示词和模型能力边界的认识。

### 模块列表

- LLM 基本能力与局限
- Prompt 基础写法
- 上下文、角色设定、输出约束
- 结构化输出与简单提示词模板

### 完成标准

- 能写出结构清晰的 Prompt
- 能理解模型为什么会“胡说”或偏题
- 能根据任务类型调整提示词结构

### 推荐产出

- Prompt 模板笔记
- 至少 3 个不同任务场景的 Prompt 示例

### 经验值建议

- 完成阶段：`120 EXP`

## 5.3 阶段三：Agent 核心概念

### 阶段目标

建立对 Agent 核心能力的系统理解，包括任务拆解、工具调用、记忆、规划和工作流。

### 模块列表

- 什么是 Agent，不只是“会聊天”
- Agent 的基本组成：目标、上下文、工具、执行器
- Tool Calling 概念
- Memory 概念
- Planning 与 Workflow 概念
- 单 Agent 和多 Agent 的区别

### 完成标准

- 能解释一个 Agent 系统的最小组成
- 能区分 Prompt 工具、工具调用、工作流编排的差别
- 能看懂一个基础 Agent Demo 的结构

### 推荐产出

- 一篇 Agent 核心概念总结
- 一个 Agent 结构拆解图

### 经验值建议

- 完成阶段：`180 EXP`

## 5.4 阶段四：Agent 应用实战

### 阶段目标

帮助用户从“理解概念”走向“能做项目”，形成能放进简历或作品集的实战经验。

### 模块列表

- 做一个简单的知识问答型 Agent
- 做一个任务助手型 Agent
- 学习如何设计工具调用流程
- 学习如何组织 Agent 项目结构
- 学习如何做结果评估与复盘

### 完成标准

- 至少完成一个可运行 Demo
- 能清楚描述项目目标、输入、输出和流程
- 能总结项目中遇到的问题和改进点

### 推荐产出

- 一个 Agent 小项目
- 一篇项目复盘笔记

### 经验值建议

- 完成阶段：`260 EXP`

## 5.5 阶段五：岗位准备与作品沉淀

### 阶段目标

帮助用户把学习成果转化为求职表达能力，包括项目包装、知识梳理和面试准备。

### 模块列表

- AI Agent 岗位常见能力要求
- 如何描述自己的 Agent 项目
- 如何整理作品集
- AI Agent 面试高频问题整理

### 完成标准

- 形成一版 AI Agent 求职简历项目描述
- 形成一版 Agent 方向作品清单
- 形成一份常见面试问答笔记

### 推荐产出

- 简历项目描述草案
- 面试问题与回答笔记

### 经验值建议

- 完成阶段：`160 EXP`

## 6. 首版模块清单建议

首版优先支持以下模块：

- `ai-overview`
- `llm-basics`
- `prompt-basics`
- `agent-overview`
- `tool-calling-basics`
- `memory-and-planning`
- `agent-demo-analysis`
- `agent-project-practice`
- `job-readiness`

## 7. 模块配置结构草案

建议每个学习模块都采用统一配置结构：

```ts
export interface LearningModuleConfig {
  key: string;
  title: string;
  stageKey: string;
  pathKey: string;
  summary: string;
  difficulty: 'intro' | 'basic' | 'intermediate';
  estimatedMinutes: number;
  expReward: number;
  prerequisiteKeys: string[];
  knowledgeItemKeys: string[];
  noteTemplateKey?: string;
  completionRule: {
    type: 'manual' | 'knowledge_and_note';
    minKnowledgeItems?: number;
    minNotes?: number;
  };
}
```

## 8. 学习路径配置结构草案

```ts
export interface LearningPathConfig {
  key: string;
  title: string;
  directionKey: string;
  summary: string;
  stageKeys: string[];
  recommendedFor: string[];
  isDefault: boolean;
}
```

首版默认路径建议：

```ts
export const aiAgentPath = {
  key: 'ai-agent-main',
  title: 'AI Agent 成长主线',
  directionKey: 'ai-agent',
  summary: '面向求职与应用开发的 AI Agent 学习路径',
  stageKeys: [
    'ai-foundation',
    'llm-prompt',
    'agent-core',
    'agent-practice',
    'job-readiness'
  ],
  recommendedFor: ['frontend-engineer', 'career-switcher'],
  isDefault: true,
};
```

## 9. 学习偏好配置草案

首版建议支持以下偏好字段：

- 当前背景：`frontend-engineer`
- 学习目标：`job-switch`、`skill-upgrade`
- 主方向偏好：`ai-agent`
- 学习节奏：`light`、`normal`、`intensive`

建议配置结构：

```ts
export interface LearningPreferenceProfile {
  background: 'frontend-engineer' | 'backend-engineer' | 'generalist';
  goal: 'job-switch' | 'skill-upgrade';
  preferredDirection: 'ai-agent';
  pace: 'light' | 'normal' | 'intensive';
}
```

## 10. 等级成长体系草案

## 10.1 等级命名

首版建议采用修仙风格等级：

1. 炼气
2. 筑基
3. 金丹
4. 元婴
5. 化神
6. 炼虚
7. 合体

## 10.2 经验值阈值建议

```ts
export const levelRules = [
  { level: 1, title: '炼气', minExp: 0 },
  { level: 2, title: '筑基', minExp: 100 },
  { level: 3, title: '金丹', minExp: 260 },
  { level: 4, title: '元婴', minExp: 480 },
  { level: 5, title: '化神', minExp: 760 },
  { level: 6, title: '炼虚', minExp: 1100 },
  { level: 7, title: '合体', minExp: 1500 },
];
```

## 10.3 经验值来源建议

- 完成一个知识条目学习：`10 EXP`
- 完成一篇学习笔记：`15 EXP`
- 完成一个学习模块：`30-80 EXP`
- 完成一个阶段总结：`40 EXP`
- 连续学习打卡：`5 EXP / 天`

## 11. 模块完成规则建议

首版不做过于复杂的自动判断，建议采用“半自动完成”：

- 用户完成知识条目阅读后可手动勾选
- 用户完成笔记后系统自动识别完成条件
- 当模块最小条件满足后，允许用户点击“完成本模块”

建议完成规则分级：

- `manual`：手动完成
- `knowledge_only`：完成指定知识条目数
- `knowledge_and_note`：完成知识条目并提交至少一篇笔记
- `project_based`：完成项目实践并填写复盘

## 12. 首版推荐内容排序逻辑

用户首页推荐内容优先级建议如下：

1. 当前学习路径中未完成且已解锁的模块
2. 与 `AI Agent` 方向最相关的知识条目
3. 最近中断的学习模块
4. 当前等级对应的推荐挑战内容

## 13. 首版需要配置化的内容

以下内容建议直接做成配置文件：

- 学习方向列表
- 学习路径列表
- 阶段定义
- 学习模块定义
- 模块解锁条件
- 等级名称与经验值阈值
- 笔记模板映射
- Dashboard 推荐规则参数

## 14. 首版不建议过度配置化的内容

- 用户实际学习进度计算逻辑
- 等级结算逻辑
- 权限判断
- 复杂推荐算法

## 15. 对应页面建议

为了配合这套学习路径，首版页面建议重点实现：

- `Dashboard`：展示当前等级、推荐模块、学习进度
- `Learning Path`：展示阶段、模块和完成状态
- `Knowledge`：展示知识条目和关联模块
- `Notes`：承载学习笔记与阶段总结
- `Growth`：展示等级、经验值和成长记录
- `Settings`：选择学习偏好和节奏

## 16. 后续扩展方向

未来可以在这套配置基础上继续扩展：

- `RAG 工程方向`
- `AI Workflow 方向`
- `多 Agent 协作方向`
- `Prompt Engineer 方向`
- `AI 产品经理方向`

## 17. 下一步建议

如果基于本文档继续推进，下一步建议直接输出两份内容：

- `AI Agent 学习模块种子数据草案`
- `成长等级与经验值结算规则草案`
