# M2 设计索引 · 学习路径 + 知识配置（已按决策刷新）

对应 `docs/milestones.md` **§5 M2**，本迭代在 **产品里程碑** 基础上做了 **范围裁剪与鉴权策略调整**（见下文「相对里程碑的调整」）。

## 0. 已确认的产品与技术决策

| 项 | 决策 |
|----|------|
| 身份与鉴权 | **不开放注册**；业务请求**不校验 JWT**，全局视为数据库用户 **`username=admin`**（`DefaultAdminGuard`）；**`POST /auth/login` 仍实现**（签发 token）供后续扩展，见 [`design-auth-reserved.md`](./design-auth-reserved.md) |
| 知识可见性 | 仅 **`private`**，按 `ownerUserId` 隔离；枚举可预留 `team` |
| 搜索 | **`ILIKE`**，对 **`title`、`summary`** 做 OR 匹配（**不搜 `content`**） |
| 邮箱验证 / 找回密码 | **不做** |
| 学习偏好 | `User.preferences` **`Json`** + Zod 校验 |
| 学习路径骨架 | **`packages/config` 静态配置** + `GET /learning/entry`；**不落库用户路径进度**（归 M3）；`preferredDirection` 支持 `'ai-agent' \| 'general'` |
| 自动化测试 | 后端 **集成测**：知识、分类标签（含 409 删除）、偏好、`/learning/entry`、**`/auth/login` 仍可调用**（**不含笔记**） |
| 笔记 | **本阶段不开发**，整体 **移到下一阶段**（表可不建或仅预留，见 `design-notes-deferred.md`） |
| **核心目标** | **学习路径配置 + 知识（含分类/标签/配置化）** |
| **数据库** | **PostgreSQL**（已选定；Prisma `provider = "postgresql"`） |

## 0.1 数据库

已选定 **PostgreSQL**，与 `docs/technical-design.md` 一致。本地可用本机安装或 Docker；`DATABASE_URL` 见 [`design-prerequisites.md`](./design-prerequisites.md)。若需回顾与 SQLite 的差异，同文档保留 **选型参考表**。

## 1. 子任务拆分（建议实现顺序 · 无笔记）

| ID | 子任务 | 目标 | 依赖 |
|----|--------|------|------|
| M2-P0 | 数据层基座 | Prisma + **PostgreSQL** + migration；**不建 Note 表** | M1 |
| M2-A1 | 默认身份 + 预留登录 | seed `admin`；`DefaultAdminGuard`；**保留** `POST /auth/login` | M2-P0 |
| M2-A2 | 角色模型 | `Role` / `UserRole`；seed `admin`、`member`，默认用户挂 **admin** | M2-A1 |
| M2-G1 | 知识元数据配置 | `packages/config`：`contentType`、`difficulty`、学习路径/阶段/模块 **registry** | 与 P0 并行（纯包） |
| M2-E1 | 学习偏好 API | `GET/PATCH /users/me`；JSON 合并策略 + Zod | M2-A1 |
| M2-E2 | 学习入口 API | `GET /learning/entry` 聚合 config + 用户偏好 | M2-E1、M2-G1 |
| M2-B1 | 分类与标签 | Category / Tag CRUD | M2-A1 |
| M2-C1 | 知识条目 | CRUD、标签多对多、列表筛选、**ILIKE 搜索** | M2-B1 |
| M2-F1 | 知识配置化 UI | 表单/列表 **部分** 由 `@ail/config` 驱动 | M2-C1 |
| M2-F2 | 前端闭环 | 首页、偏好设置、**学习路径/入口页**、知识列表/详情/编辑、**分类/标签管理页**；`pages/auth/login` 为**鉴权预留**说明页；HTTP | 各 API |

## 2. 设计文档列表

| 文档 | 说明 |
|------|------|
| [design-prerequisites.md](./design-prerequisites.md) | 环境变量；**已选 PostgreSQL** + SQLite 对比（参考） |
| [design-decisions.md](./design-decisions.md) | 已确认决策汇总 + 与旧「开放问题」对照 |
| [design-persistence-m2.md](./design-persistence-m2.md) | Prisma 模型（**无笔记表**） |
| [design-auth-reserved.md](./design-auth-reserved.md) | **默认 admin**、**不校验 JWT**、登录接口预留 |
| [design-api-m2.md](./design-api-m2.md) | REST 端点（**无 register、无 notes**） |
| [design-knowledge-tags.md](./design-knowledge-tags.md) | 知识/分类/标签、**ILIKE 搜索范围** |
| [design-learning-preference-path.md](./design-learning-preference-path.md) | 偏好 JSON、路径 config、**已确认 Q6/Q7** |
| [design-client-m2.md](./design-client-m2.md) | uni-app 页面（**无注册、无笔记**） |
| [design-notes-deferred.md](./design-notes-deferred.md) | 笔记延后说明与后续衔接 |

## 3. 相对 `docs/milestones.md` §5 的调整说明

| 里程碑原文 | 本迭代处理 |
|------------|------------|
| 用户注册与登录 | **去掉注册**；**不做强制登录与 JWT 校验**；数据与接口仍以 **admin** 为默认用户；**保留** `POST /auth/login` 供扩展 |
| 笔记 CRUD、笔记关联知识 | **整项移到下一阶段**，M2 不实现接口与页面 |
| 其余（角色、偏好、知识、分类标签、搜索、详情、部分配置化、路径配置骨架） | **保留并作为核心** |

后续可在 `docs/milestones.md` 增加「M2 实施说明」链接至本文档，避免歧义（可选）。
