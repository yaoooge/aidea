# M2 · 前端（uni-app）设计概要（无注册 · 无笔记）

## 页面（建议）

| 路由 | 说明 |
|------|------|
| `pages/index/index` | 首页（学习概览 Dashboard） |
| `pages/auth/login` | **鉴权预留**：说明当前无登录门槛；可选「测试 `/auth/login`」；**非启动必经页** |
| `pages/settings/preferences` | 学习偏好 → `PATCH /users/me`（整对象替换，body: `{ preferences: {...} }`） |
| `pages/settings/categories` | 分类管理：列表 + 新建 + 编辑 + 删除（删除时后端返回 409 则提示先解绑） |
| `pages/settings/tags` | 标签管理：列表 + 新建 + 编辑 + 删除 |
| `pages/learning/index`（或首页 Tab） | **`GET /learning/entry`** + config 展示路径/阶段/模块；**核心页面** |
| `pages/knowledge/index` | 列表 + 分类/标签筛选 + 搜索（q） |
| `pages/knowledge/detail` | 详情（含分类名与标签列表） |
| `pages/knowledge/edit` | 新建/编辑；`categoryId` 下拉选已有分类，`tagIds[]` 多选已有标签；部分字段由 `@ail/config` 驱动 |

**不提供** `pages/auth/register`、**任何笔记**相关页面。

## 状态与请求

- **Pinia**（若采用）：可按模块拆分 knowledge / category / tag 等；**无需**以 token 为核心的 auth store（除非后续恢复登录）。
- **HTTP**：`src/services/http.ts` — baseURL、统一 JSON；**不**附带 `Authorization`（与当前后端策略一致）。

## 知识编辑表单的分类/标签交互

- `categoryId` 字段：从分类列表以下拉选择渲染；可选（留空表示无分类）。
- `tagIds[]` 字段：从标签列表以多选渲染；可选多个或不选。
- 分类/标签的**创建与管理**入口在独立页面（`pages/settings/categories`、`pages/settings/tags`），编辑表单内**不内联创建**。

## 配置驱动

- `@ail/config` 增量：**学习路径 registry**、`contentType` / `difficulty`、知识表单字段定义与列表列定义（与后端枚举一致）。

## 非目标（M2）

- 笔记、Dashboard 完整数据卡片、AI Chat、用户注册、强制登录流程。
