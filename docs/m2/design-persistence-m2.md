# M2 · Prisma 持久化设计（范围 · 无笔记）

## 原则

- **数据库**：**PostgreSQL**（见 `design-prerequisites.md`）。  
- 对齐 `docs/data-model.md` 语义；**M2 不实现笔记**，**不建** `Note` / `NoteKnowledgeRef`（下一阶段再建表与接口）。  
- 所有业务表按 `ownerUserId` 隔离；可见性 **仅 `private`**（枚举可含 `team` 值但接口不启用）。  

## 纳入 M2 的模型

| 模型 | 说明 |
|------|------|
| `User` | **`username` 唯一**（当前默认身份 `admin`）、`email` 唯一（如 `admin@local`）、`passwordHash`、`displayName`、`status`、**`preferences Json?`**（学习偏好） |
| `Role` | `code` 唯一：`admin`、`member` |
| `UserRole` | userId + roleId |
| `Category` | ownerUserId、name、slug、description |
| `Tag` | ownerUserId、name、color |
| `KnowledgeItem` | title、summary、content、sourceUrl、sourceType、categoryId?、ownerUserId、visibility、contentType、difficulty（与 `@ail/config` / Prisma enum 对齐） |
| `KnowledgeTag` | knowledgeItemId + tagId |

## 字段约定

所有业务表均包含以下隐式字段（Prisma 默认）：
- `id`：`String @id @default(cuid())`
- `createdAt`：`DateTime @default(now())`
- `updatedAt`：`DateTime @updatedAt`

## 索引（最小集）

- `User.username` UNIQUE
- `User.email` UNIQUE
- `Role.code` UNIQUE  
- `Category @@unique([ownerUserId, slug])`  
- `Tag @@unique([ownerUserId, name])`  
- `KnowledgeItem(ownerUserId, updatedAt)`、`KnowledgeItem(categoryId)`  

## Seed（开发）

- 插入 `Role`：`admin`、`member`。  
- 插入用户：**`username=admin`**、`email=admin@local`、**密码 `123456` 的 bcrypt 哈希**；关联 **admin 角色**。
- **禁止**在仓库提交含真实生产密码的 `.env`；默认口令仅用于本地/demo。  

## 枚举建议

- `UserStatus`：`active` | `disabled`  
- `KnowledgeVisibility`：`private`（M2 仅使用此项）  
- `KnowledgeSourceType`、`KnowledgeContentType`、`DifficultyLevel`：与 `packages/config` 同步，倾向 **Prisma enum**。  

## TDD / 集成测试

- 使用 **独立测试库** 或同一 DB 的 migrate + 隔离数据；**不测笔记**。  
