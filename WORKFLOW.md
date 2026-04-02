# AIdea 工程工作流（根目录）

本文件与 `docs/development-workflow.md`、`docs/milestones.md` 配合使用，供 **每次迭代** 复用。更细的 M1 任务设计见 `docs/m1/`。

## 1. 日常命令

| 命令 | 说明 |
|------|------|
| `npm install` | 安装全 monorepo 依赖 |
| `npm run dev:client` | 前端 uni-app H5 开发 |
| `npm run dev:api` | 后端 NestJS 开发 |
| `npm run build` | 各 workspace 构建（有则执行） |
| `npm run lint` | 各 workspace 代码检查 |
| `npm run test` | 各 workspace 测试 |

## 2. 测试驱动开发（TDD）

**约定**：除「工程脚手架 / 纯初始化」外，新功能按以下顺序执行（与 `docs/development-workflow.md` 一致）：

1. 先写测试用例（或契约/E2E 步骤）
2. 运行测试，确认失败（红）
3. 实现最小可用代码
4. 运行测试至通过（绿）
5. 必要时重构并保持测试绿

Cursor 侧通过 `.cursor/rules/ail-tdd.mdc` 强化该约定。

## 3. 版本管理与分支

- 主分支：`main`
- 功能分支：`feat/<name>`、`fix/<name>`、`chore/<name>`
- 详见 `CONTRIBUTING.md`

## 4. 环境变量

- 根目录 `.env.example` 列出跨应用变量说明
- 禁止将 `.env`、`.env.local`、密钥提交入库（见 `.gitignore`）

## 5. 文档入口

- 产品：`docs/product-requirements.md`
- 技术方案：`docs/technical-design.md`
- 里程碑：`docs/milestones.md`
- M1 设计：`docs/m1/README.md`
- M2 设计：`docs/m2/README.md`

## 6. 前端 UI 样式规范 / 编码约束

详细规范（设计 Token、`ail-` 全局类速查、页面结构模板、前后端编码约束、提交前检查清单）
已内嵌到项目级 Claude skill，由 AI 开发时自动加载：

```
.claude/skills/aidea-dev/SKILL.md
```

### 6.1 样式文件

| 文件 | 用途 |
|------|------|
| `apps/client/src/styles/theme.scss` | 设计 Token（`var(--ail-*)`），禁止硬编码颜色 |
| `apps/client/src/styles/components.css` | 全局 `ail-` 组件类，`App.vue` 已全局导入 |

### 6.2 `ail-` 全局类一览

Section 布局 · 卡片 · 列表条目 · Badge/Chip · CTA 按钮 · FAB · 导航栏 · 空状态 · 加载状态
→ 完整速查与代码片段见 `.claude/skills/aidea-dev/SKILL.md`

---

## 7. M2 本地联调（PostgreSQL）

1. 环境变量：`apps/api/.env.development` 已提供本地默认 `DATABASE_URL` / `JWT_SECRET`（随仓库提交）。若要覆盖，在同目录创建 `.env`（优先合并）。亦见 `apps/api/.env.example`。
2. `cd apps/api && npx prisma migrate deploy && npx prisma db seed`（开发可用 `prisma migrate dev`）。
3. 根目录：`npm run build --workspace @ail/config`（`dev:api` / `build` 会自动先构建 config）。
4. `npm run dev:api`；前端 `apps/client/.env.development` 已配置 `VITE_API_BASE_URL`。
5. 集成测试：`DATABASE_URL` 与 `JWT_SECRET` 就绪时 `npm run test --workspace @ail/api` 会跑 M2 e2e（**无需**请求头 token；业务默认 admin）；否则 M2 套件自动 skip。
