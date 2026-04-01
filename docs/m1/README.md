# M1 工程骨架 · 任务拆分与设计索引

本文档对应 `docs/milestones.md` 中 **§4 M1 工程骨架完成** 的落地拆分。实现顺序：**先完成工程初始化（不设 TDD 门槛）**，其余任务 **先写用例再实现**。

## 并行关系

| 任务 ID | 名称 | 可并行 | 依赖 |
|--------|------|--------|------|
| M1-INIT | 根目录工具链、Git 规范文档、环境变量约定 | 否（先做） | 无 |
| M1-CFG | `packages/config` schema 与校验加载 | 可与 API 并行 | INIT |
| M1-API | `apps/api` NestJS 与启动链路 | 可与 CFG 并行 | INIT |
| M1-CLI | `apps/client` uni-app H5 | 否（建议 CFG 完成后做别名与联调） | INIT, CFG |
| M1-SHR | `packages/shared` 基线测试 | 可与 CFG/API 并行 | INIT |

## 设计文档

- [design-init.md](./design-init.md) — 初始化与仓库约定（含分支命名）
- [design-tooling.md](./design-tooling.md) — ESLint、Prettier、TypeScript 基线
- [design-config-package.md](./design-config-package.md) — 配置 schema、加载与单测
- [design-api.md](./design-api.md) — NestJS 启动与健康检查
- [design-client.md](./design-client.md) — uni-app H5 与配置驱动页面
- [design-shared-package.md](./design-shared-package.md) — 共享包测试约定

## 验收对照（M1）

见 `docs/milestones.md` §4 验收标准；本目录各 `design-*.md` 含可执行验收条目。
