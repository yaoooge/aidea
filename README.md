# AIdea · 爱点子

一个面向个人 AI 学习成长的全栈工具。知识管理 + AI 对话 + 实验记录，帮你把每一个爱点子沉淀下来。

目标是先交付基于 `uni-app` 的 **H5** 版本，再逐步演进到移动端应用。

## M1 状态（工程骨架）

- **Monorepo**：`npm workspaces`（`apps/*`、`packages/*`）
- **前端**：`apps/client` 为 `uni-app` + Vue3 + Vite + TS，首页用 `@ail/config` 驱动导航与 Dashboard 卡片展示
- **后端**：`apps/api` 为 `NestJS`，`GET /health` 可用
- **配置包**：`packages/config` 含 Zod schema 与 `getAppShellConfig()` 校验加载
- **流程与约束**：根目录 `WORKFLOW.md`、`.cursor/rules/`（TDD 与 monorepo 约定）

## 常用命令

| 命令 | 说明 |
|------|------|
| `npm install` | 安装依赖 |
| `npm run dev:client` | H5 开发（uni） |
| `npm run dev:api` | API 开发（Nest watch） |
| `npm run build` | 各包构建 |
| `npm run test` | 各包测试 |
| `npm run lint` | ESLint（根配置） |

详见 **`WORKFLOW.md`**。

## 文档入口

- `docs/product-requirements.md`：产品需求
- `docs/technical-design.md`：技术实施方案
- `docs/data-model.md`：数据模型
- `docs/milestones.md`：里程碑与任务拆分
- `docs/m1/README.md`：M1 任务拆分与设计索引
- `docs/development-workflow.md`：测试驱动与提交约定

## 推荐下一步（M2）

1. 按 `docs/data-model.md` 建立 `Prisma` 与 `PostgreSQL`
2. 实现注册登录与 JWT
3. 打通知识、笔记与学习偏好最小闭环
