# M2 · REST API 设计概要（无注册 · 无笔记）

## 统一响应

与 `docs/technical-design.md` 对齐：

```ts
{ "code": "OK" | string, "message": string, "data": T, "requestId"?: string }
```

错误响应示例：

```json
{ "code": "VALIDATION_ERROR", "message": "参数校验失败", "data": null }
```

## 资源端点一览

### 认证（预留）

| Method | Path | 说明 | 备注 |
|--------|------|------|------|
| `POST` | `/auth/login` | body: `{ username, password }`，成功返回 **accessToken** | **当前其它路由不校验该 token**；供后续接入鉴权 |

**无** `/auth/register`。无独立 logout 接口。

### 用户与偏好

| Method | Path | 说明 |
|--------|------|------|
| `GET` | `/users/me` | 当前用户信息（含 preferences）；后端固定解析为 **admin** 用户 |
| `PATCH` | `/users/me` | 更新偏好（**整对象替换**，body: `{ preferences: {...} }`） |

`PATCH /users/me` 采用**整对象替换**策略：前端每次传完整 `preferences` 对象，后端直接覆盖，Zod 校验后写入。

### 分类

| Method | Path | 说明 |
|--------|------|------|
| `GET` | `/categories` | 列表（仅 owner） |
| `POST` | `/categories` | 创建 |
| `PATCH` | `/categories/:id` | 更新 |
| `DELETE` | `/categories/:id` | 删除；仍有 KnowledgeItem 引用时返回 **409** |

### 标签

| Method | Path | 说明 |
|--------|------|------|
| `GET` | `/tags` | 列表（仅 owner） |
| `POST` | `/tags` | 创建 |
| `PATCH` | `/tags/:id` | 更新 |
| `DELETE` | `/tags/:id` | 删除；关联 `KnowledgeTag` 记录**级联删除** |

### 知识条目

| Method | Path | 说明 |
|--------|------|------|
| `GET` | `/knowledge` | 列表（分页、筛选、搜索） |
| `POST` | `/knowledge` | 创建 |
| `GET` | `/knowledge/:id` | 详情（含标签与分类） |
| `PATCH` | `/knowledge/:id` | 更新 |
| `DELETE` | `/knowledge/:id` | 删除；关联 `KnowledgeTag` 记录**级联删除** |

列表 query 参数：`categoryId`、`tagId`、`q`（ILIKE title/summary）、`page`、`pageSize`。

### 学习入口

| Method | Path | 说明 |
|--------|------|------|
| `GET` | `/learning/entry` | 按 **admin** 用户偏好返回路径入口元数据（只读，聚合 config） |

#### `/learning/entry` 响应 schema

```ts
{
  "code": "OK",
  "data": {
    "direction": "ai-agent" | "general",
    "path": {
      "key": string,           // 如 "ai-agent-main"
      "title": string,
      "summary": string,
      "isDefault": boolean
    },
    "stages": [
      {
        "key": string,         // 如 "ai-foundation"
        "title": string,
        "modules": [
          { "key": string, "title": string }
        ]
      }
    ],
    "highlight": string[]      // 高亮模块 key 列表（当 direction=ai-agent 时突出 Agent 相关模块）
  }
}
```

- `direction` = 用户 `preferences.preferredDirection`；若 `preferences` 为 null 或未设置，默认 `"ai-agent"`。
- `general` 方向返回全量阶段，无 `highlight`。
- 数据来源为 `@ail/config` 静态 registry，**不查询数据库**（除读取用户 preferences）。

**本阶段不提供** `/notes` 及任何笔记相关路由。

## 搜索约定

- 参数 `q`：对 **`title`、`summary`** 做 **OR + ILIKE**（`%q%`）；**不匹配 `content`**。
- 数据库为 **PostgreSQL**；后续若改 `tsvector` 全文检索，仅后端实现变更。

## 分页

- `page` 从 1，`pageSize` 默认 20，上限 100。
- `data: { items, total, page, pageSize }`。

## 通用状态码

| Code | 场景 |
|------|------|
| 200 | 成功（含 GET、PATCH、DELETE） |
| 201 | 成功创建（POST） |
| 400 | 请求参数校验失败 |
| 403 | 无权操作（访问他人资源） |
| 404 | 资源不存在 |
| 409 | 业务冲突（如删除仍被引用的 Category） |
| 503 | 未找到可用 admin 用户（需 seed） |

## 校验

- DTO + `class-validator` 或 Zod — **实现时全仓统一**。

## OpenAPI

- 可选；不阻塞 M2。
