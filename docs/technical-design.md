# AIdea · 技术实施方案

## 1. 文档目标

本文档定义 `AIdea` 的首版技术架构、目录组织、模块边界、配置驱动设计和前后端通信方案，用于指导实际工程初始化与后续开发。首版重点支持 `AI 基础知识学习`、`AI Agent` 定向路径、学习偏好与成长等级体系，`AI 对话` 与 `实验记录` 作为后续扩展模块预留。

## 2. 技术选型

## 2.1 前端

- 框架：`uni-app`
- 基础技术：`Vue 3` + `TypeScript`
- 状态管理：`Pinia`
- 路由与页面组织：基于 `pages.json`，同时扩展业务路由配置层
- 网络请求：封装统一 `http client`
- 表单与配置校验：`zod`

选择原因：

- 可优先输出 H5 版本，满足浏览器运行
- 后续可扩展到移动端，降低重构成本
- Vue 生态适合做配置驱动页面容器和中后台式管理界面

## 2.2 后端

- 运行时：`Node.js`
- 框架：`NestJS`
- 语言：`TypeScript`
- 接口形态：`REST API`
- 鉴权：`JWT`
- 参数校验：`class-validator` 或 `zod` 适配层

选择原因：

- 模块边界清晰，适合中长期演进
- 易于按领域拆分 `auth`、`learning-path`、`knowledge`、`notes`、`growth`
- 对多人系统和后续管理能力更友好

## 2.3 数据层

- 数据库：`PostgreSQL`
- ORM：`Prisma`
- 缓存：首版不强依赖，预留 `Redis`

## 2.4 工程化

- 包管理：`npm`
- Monorepo：`npm workspaces`
- 代码规范：`ESLint` + `Prettier`
- 单元测试：`Vitest` 或 `Jest`
- E2E：`Playwright`
- 接口文档：`OpenAPI`
- 版本管理：`Git + GitHub`

## 2.5 开发流程约束

首版开发流程采用 `测试驱动` 模式：

1. 先为目标功能补充测试用例
2. 运行测试，确认新用例先失败
3. 再实现功能代码
4. 重新运行测试并修复失败项
5. 通过测试后再进入下一项开发

版本管理采用以下原则：

- 本地使用 `Git` 管理版本
- 远程仓库托管在 `GitHub`
- 优先采用小步提交，避免一次提交过大
- 功能开发前先同步主分支最新状态
- 涉及新功能时，优先按功能分支开发

## 3. 推荐目录结构

```text
AILearning/
  apps/
    client/
    api/
  packages/
    shared/
    ui/
    config/
  docs/
  infra/
  package.json
  tsconfig.base.json
```

## 3.1 前端目录建议

```text
apps/client/
  src/
    pages/
    modules/
    components/
    stores/
    services/
    config-runtime/
    platform-adapter/
    utils/
    constants/
  pages.json
  manifest.json
  vite.config.ts
```

说明：

- `pages/` 存放页面入口
- `modules/` 按业务域组织页面逻辑
- `config-runtime/` 负责解析配置并驱动页面模块
- `platform-adapter/` 处理 H5 与移动端差异
- `services/` 封装 API 调用

## 3.2 后端目录建议

```text
apps/api/
  src/
    app.module.ts
    common/
    config/
    modules/
      auth/
      users/
      learning-path/
      knowledge/
      notes/
      growth/
      dashboard/
      audit/
  prisma/
    schema.prisma
```

说明：

- `common/` 放通用异常、响应封装、守卫、拦截器
- `config/` 放环境变量与系统配置读取
- `modules/` 采用领域拆分

## 3.3 共享包目录建议

```text
packages/shared/
  src/
    types/
    enums/
    constants/
    dto/

packages/ui/
  src/
    components/
    layouts/

packages/config/
  src/
    navigation/
    dashboard/
    forms/
    knowledge/
    learning-path/
    growth/
    settings/
    schemas/
```

## 4. 前端架构设计

## 4.1 分层原则

前端按四层组织：

1. `page layer`：页面入口和页面生命周期
2. `module layer`：业务逻辑与页面编排
3. `component layer`：通用组件与业务组件
4. `config layer`：页面、表单、卡片、工具配置

目标是把高变动业务尽量收敛到配置层和模块层，减少页面代码重复。

## 4.2 配置驱动设计

首版配置驱动只覆盖“高复用、高一致性”的内容。

### 建议配置化对象

- 导航菜单
- Dashboard 卡片
- 学习方向与学习路径信息
- 列表列定义
- 表单字段定义
- 等级与成就规则
- 设置项定义
- 空状态与提示文案

### 不建议首版完全配置化的对象

- 富文本编辑器内部逻辑
- 复杂异步流程编排
- 权限核心逻辑
- 平台底层适配

## 4.3 配置文件示例

```ts
export const knowledgeFormConfig = {
  formId: 'knowledge-edit',
  fields: [
    { key: 'title', label: '标题', type: 'input', required: true },
    { key: 'summary', label: '摘要', type: 'textarea' },
    { key: 'sourceUrl', label: '来源链接', type: 'input' },
    { key: 'categoryId', label: '分类', type: 'select' },
  ],
} as const;
```

## 4.4 配置运行时

`config-runtime` 负责：

- 读取业务配置
- 执行 schema 校验
- 转换为页面可用的数据结构
- 为页面容器组件提供统一渲染输入

建议核心接口如下：

```ts
interface ConfigResolver<TInput, TOutput> {
  validate(input: TInput): TOutput;
  resolve(input: TOutput): TOutput;
}
```

## 4.5 前端状态管理

推荐按领域拆分 store：

- `useAuthStore`
- `useLearningPathStore`
- `useKnowledgeStore`
- `useNotesStore`
- `useGrowthStore`
- `useDashboardStore`
- `useSettingsStore`

状态管理原则：

- 服务端数据优先在页面进入时拉取
- 本地 store 主要管理 UI 状态、缓存数据和跨组件共享状态
- 避免把全部后端实体镜像进单一全局 store

## 4.6 平台差异处理

在 `platform-adapter` 中统一封装以下能力：

- 存储差异
- 上传能力差异
- 页面跳转兼容封装
- H5 与移动端交互差异

禁止业务页面直接写平台判断，统一经适配层调用。

## 5. 后端架构设计

## 5.1 模块边界

- `auth`：注册、登录、JWT 签发、权限守卫
- `users`：用户资料、角色
- `learning-path`：学习方向、学习路径、学习模块、偏好配置
- `knowledge`：知识条目、分类、标签
- `notes`：笔记管理
- `growth`：经验值、等级规则、成就记录
- `dashboard`：聚合统计接口
- `audit`：操作日志

## 5.2 分层建议

每个业务模块建议按以下结构组织：

```text
controller -> service -> repository(prisma) -> database
```

同时补充：

- `dto/`：请求参数与响应模型
- `entities/`：领域实体映射
- `guards/`：权限控制

## 5.3 API 设计原则

- REST 风格优先
- 路由语义稳定
- 响应结构统一
- 错误码统一
- 分页、筛选、排序参数风格一致

统一响应建议：

```ts
interface ApiResponse<T> {
  code: string;
  message: string;
  data: T;
  requestId?: string;
}
```

## 6. 学习路径与成长体系设计

## 6.1 目标

通过配置文件和后端数据模型联合驱动用户学习体验，支持：

- 用户选择学习偏好
- 首页按偏好推荐学习路径
- 首期优先展示 `AI Agent` 路线
- 用户完成学习后获得经验并升级

## 6.2 抽象层结构

```text
learning-path/
  configs/
  services/
    learning-preference.service.ts
    learning-path.service.ts
    learning-module.service.ts

growth/
  configs/
  services/
    growth-rule.service.ts
    level.service.ts
    achievement.service.ts
```

## 6.3 核心接口

```ts
interface LearningPreferenceConfig {
  key: string;
  title: string;
  priorityPaths: string[];
}

interface LevelRule {
  level: number;
  title: string;
  minExp: number;
}

interface LearningModuleConfig {
  key: string;
  title: string;
  pathKey: string;
  difficulty: 'intro' | 'basic' | 'intermediate';
}
```

## 6.4 等级体系设计

职责：

- 根据学习行为累计经验值
- 根据经验区间计算当前等级
- 根据配置输出等级名称与成长提示
- 为 Dashboard 提供成长进度数据

## 6.5 配置注册表示例

学习方向和等级建议配置化注册：

```ts
export const learningPreferences = [
  {
    key: 'ai-agent',
    title: 'AI Agent',
    priorityPaths: ['agent-foundation', 'agent-practice'],
  },
];
```

这样前端展示、推荐逻辑和后端进度计算都可以基于统一 key 协作。

## 7. 前后端通信设计

## 7.1 鉴权

- 登录成功后返回 `accessToken`
- 前端统一通过请求拦截器附带 token
- 后端通过 JWT Guard 校验身份

## 7.2 请求分层

前端 API 调用建议按以下层级组织：

```text
services/http -> services/modules -> stores/modules -> pages/modules
```

优点：

- 统一鉴权、错误处理、重试策略
- 方便替换 API 地址和调试

## 8. 环境配置

建议拆分：

- `.env`
- `.env.local`
- `.env.production`

关键变量示例：

- `DATABASE_URL`
- `JWT_SECRET`
- `API_BASE_URL`
- `DEFAULT_LLM_PROVIDER`
- `ENCRYPTION_KEY`（用于加解密数据库中存储的 API Key，32 字节随机串）

说明：AI Provider 的 API Key 通过 Settings UI 由用户配置，经加密后存入数据库（见 6.7 节），**不再通过环境变量直接注入**。`ENCRYPTION_KEY` 本身必须妥善保管，不得提交至代码仓库。

## 9. 初始化开发顺序

1. 建立 monorepo 与根配置
2. 初始化 `apps/client`
3. 初始化 `apps/api`
4. 初始化 `packages/shared`
5. 初始化 `packages/config`
6. 接入 Prisma 和 PostgreSQL
7. 完成 `auth` 最小闭环
8. 完成 `learning-path`
9. 完成 `knowledge` 与 `notes`
10. 完成 `growth`
11. 完成 `dashboard`
12. 预留 `ai` 与 `experiments` 扩展模块

## 10. 测试策略

### 单元测试

- 配置解析器
- 学习路径推荐 service
- 等级计算 service
- 核心 service

### 集成测试

- 登录
- 学习偏好设置
- 知识条目 CRUD
- 学习模块完成打卡

### E2E

- 用户登录
- 选择学习偏好
- 新增知识条目
- 新建笔记
- 完成学习模块
- 查看等级提升

### TDD 执行规则

- 先写测试，再写实现
- 优先覆盖配置解析、进度计算、等级结算、学习路径推荐等高价值逻辑
- 页面测试优先覆盖关键交互，不追求对静态展示做过量测试
- 每完成一个功能点，必须至少有一条可验证的测试路径

## 11. 关键风险与约束

- `uni-app` H5 与移动端交互细节存在差异，首版必须避免业务代码直接依赖平台分支
- 配置驱动不等于所有能力都 DSL 化，需要控制抽象边界
- 学习路径配置、等级规则和前端展示必须共享统一 key，避免推荐逻辑与展示逻辑错配
- 测试驱动实施中要优先维护高价值测试，避免堆积低价值样板用例

## 12. 首版建议输出物

- 根目录工程初始化
- `apps/client` 基础壳
- `apps/api` 基础壳
- `packages/config` 配置示例
- `packages/shared` 类型定义
- 鉴权、学习路径、知识条目、笔记、成长等级最小闭环
- Git/GitHub 版本管理流程
- 测试驱动开发基线
