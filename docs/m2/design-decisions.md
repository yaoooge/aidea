# M2 · 已确认决策（2026-04-02 刷新）

本文档固化与产品/用户的对齐结果，替代原「逐项开放提问」流程。

## 已确认

- **Q1 数据库**：**PostgreSQL**（Prisma `postgresql`；`DATABASE_URL` 见 `design-prerequisites.md`）。
- **Q2 鉴权（当前实现）**：业务 API **不校验 JWT**；`DefaultAdminGuard` 将请求绑定为数据库 **`username=admin`**；**`POST /auth/login` 仍签发 accessToken** 供后续扩展（见 `design-auth-reserved.md`）。
- **Q3 知识可见性**：仅 **`private`**（枚举可预留 `team` 值但接口不启用）。
- **Q4 搜索**：使用 **`ILIKE`**；范围定为 **`title` + `summary`**（不搜正文 `content`）。
- **Q5 邮箱验证/找回密码**：**不做**。
- **Q6 学习偏好存储**：存 **`User.preferences` JSON**；PATCH 采用**整对象替换**（前端每次传完整对象，后端 Zod 校验后整体覆盖）。
- **Q7 学习路径**：仅 **config + 只读 API**，进度不落库（归 M3）。
- **Q8 集成测试范围**：覆盖 **知识 CRUD 与筛选、分类与标签 CRUD（含 409 删除校验）、偏好 PATCH、`/learning/entry`、`POST /auth/login` 仍可返回 token**；**不含笔记**。
- **内置用户**：seed **`username=admin`**（及角色等）；口令仅开发环境；详情见 `design-auth-reserved.md`。
- **登录接口 body**：`POST /auth/login` 使用 **`{ username, password }`**（预留，非当前鉴权主路径）。
- **偏好接口路径**：**`GET /users/me`** + **`PATCH /users/me`**（不使用 `/users/me/preferences` 子路径）。
- **Category 删除**：仍有 KnowledgeItem 引用时**返回 409**，错误码 `CATEGORY_IN_USE`；不级联置 null。
- **Tag 删除**：关联 `KnowledgeTag` 记录**级联删除**；知识条目其余标签不受影响。
- **preferredDirection 枚举**：`'ai-agent' | 'general'`；缺失/null 时默认 `'ai-agent'`；非法值返回 400。
- **分类/标签管理前端**：提供**独立管理页**（`pages/settings/categories`、`pages/settings/tags`）；知识编辑表单内不内联创建，通过下拉/多选消费已有数据。
- **范围**：**笔记能力整体移到下一阶段**；M2 核心为**学习路径配置 + 知识（含分类/标签与部分配置化）**。
