# AIdea · 爱点子

一个面向个人 AI 学习成长的全栈工具。知识管理 + AI 对话 + 实验记录，帮你把每一个爱点子沉淀下来。

目标是先交付基于 `uni-app` 的 **H5** 版本，再逐步演进到移动端应用。

## M1 + M2（当前）

- **Monorepo**：`npm workspaces`（`apps/*`、`packages/*`）
- **前端**：`uni-app` H5；**首页直达**（无强制登录）；`pages/auth/login` 为鉴权预留说明；已实现 **学习路径**、**知识列表/详情/编辑**、**偏好设置**与 `VITE_API_BASE_URL` 联调
- **后端**：`NestJS` + **PostgreSQL** + **Prisma**；统一响应 `{ code, message, data }`；业务默认 **admin**（`DefaultAdminGuard`）；**`POST /auth/login` 仍签发 JWT** 供后续扩展；`GET /learning/entry` 聚合 `@ail/config`；知识 / 分类 / 标签 CRUD 与 ILIKE 搜索
- **配置包**：`@ail/config` 产出 **dist**（供 Node 加载）；含 **学习路径 registry**、`getLearningEntry()`、知识枚举文案
- **流程**：更细的约定见根目录 **`WORKFLOW.md`**；M2 设计见 **`docs/m2/README.md`**

## 本地联调 · 关键命令

在仓库根目录执行（需已安装 **Node.js**、本机 **PostgreSQL** 可连，见下表）。

| 步骤 | 命令 | 说明 |
|------|------|------|
| 1 安装依赖 | `npm install` | 全 monorepo |
| 2 启动数据库 | `brew services start postgresql@16` | macOS + Homebrew 安装的 PG；其它环境请自行保证 `5432` 上有库 `aidea` |
| 3 库表与种子 | `cd apps/api && npx prisma migrate deploy && npx prisma db seed` | 需 `DATABASE_URL`：`apps/api/.env`（本地、gitignore）或环境变量，与 `apps/api/.env.development` 一致即可 |
| 4 构建配置包 | `npm run build --workspace @ail/config` | `dev:api` 会预构建；单独跑 API 若报错可先执行本条 |
| 5 启 API | `npm run dev:api` | 默认 `http://127.0.0.1:3000` |
| 6 启 H5 | `npm run dev:client` | 默认联调 `VITE_API_BASE_URL` 见 `apps/client/.env.development` |
| 7 联调自测 | `curl -s http://127.0.0.1:3000/health` | 期望 HTTP 200 |
| 8 自动化确认 | `npm run test --workspace @ail/api` | 需数据库可达；会执行 migrate deploy + seed 后跑 e2e（含 M2 接口） |

**`DATABASE_URL` 示例**（与仓库内 `apps/api/.env.development` 对齐）：  
`postgresql://postgres:postgres@127.0.0.1:5432/aidea`

## 常用命令（速查）

| 命令 | 说明 |
|------|------|
| `npm install` | 安装依赖 |
| `npm run dev:client` | H5 开发（uni） |
| `npm run dev:api` | API 开发（Nest watch） |
| `npm run build` | 各包构建 |
| `npm run test` | 各 workspace 测试 |
| `npm run test --workspace @ail/api` | 仅后端（含 M2 e2e，需 PostgreSQL） |
| `npm run lint` | ESLint（根配置） |
| `cd apps/api && npx prisma studio` | 图形化查看/编辑表数据（需 `apps/api/.env` 或导出 `DATABASE_URL`） |

## 文档入口

- `docs/product-requirements.md`：产品需求
- `docs/technical-design.md`：技术实施方案
- `docs/data-model.md`：数据模型
- `docs/milestones.md`：里程碑与任务拆分
- `docs/m1/README.md`：M1 任务拆分与设计索引
- `docs/m2/README.md`：M2 设计索引
- `docs/development-workflow.md`：测试驱动与提交约定
- `WORKFLOW.md`：本仓库日常流程与 M2 PostgreSQL 说明

## 推荐下一步

1. 按上表完成 **联调**；用 `npm run test --workspace @ail/api` 做回归
2. 笔记与更多 Dashboard 能力（见 `docs/m2/design-notes-deferred.md` 与里程碑 M3）
