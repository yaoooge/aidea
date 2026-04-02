# M2 · 环境与工程衔接

## 目标

为 **PostgreSQL** + Prisma 与现有 monorepo（`WORKFLOW.md`、M1）提供一致约定；与 `docs/technical-design.md` 数据层选型对齐。

## 数据库（已选定：PostgreSQL）

- **Prisma**：`datasource db { provider = "postgresql" url = env("DATABASE_URL") }`。  
- **本地**：本机 PostgreSQL 或 Docker（示例：`docker run --name aidea-pg -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=aidea -p 5432:5432 -d postgres:16`）。  
- **`DATABASE_URL` 示例**：`postgresql://user:pass@localhost:5432/aidea`  
- 将实际连接串写入 **`.env` / `.env.local`**（勿提交仓库）；根目录 [`.env.example`](../../.env.example) 已以 PostgreSQL 为默认说明。  

### 附录：与 SQLite 的对比（选型参考，已不再采用）

| 维度 | **PostgreSQL（当前）** | SQLite（未选） |
|------|------------------------|----------------|
| 与现有技术文档 | 一致 | 不一致 |
| 本地/团队 | 需服务或容器 | 单文件零运维 |
| 扩展 | 并发、全文检索、JSON 成熟 | 写并发弱 |
| 生产路径 | 直接对齐 | 多一次迁移 |

## 目录与命令（建议）

- **Prisma**：`apps/api/prisma/schema.prisma`、`apps/api/prisma/migrations/`  
- **脚本**（在 `@ail/api`）：`prisma migrate dev`、`prisma generate`、`prisma db seed`  
- **根目录**：可透传 `db:migrate` → workspace api  

## 环境变量（增量）

- `DATABASE_URL`（必填，**PostgreSQL**）  
- `JWT_SECRET`（**`POST /auth/login` 签发 token 用**；业务路由当前不校验 JWT，仍建议配置）  
- `JWT_EXPIRES_IN`（可选，默认 **`24h`**）  
- `BCRYPT_ROUNDS`（可选，默认 **12**）  

## 与 M1 关系

- 保留 `GET /health`；新业务前缀 `/auth`、`/users`、`/categories`、`/tags`、`/knowledge`、`/learning`。  
- 前端 `VITE_API_BASE_URL` 指向 API 根。  

## 非目标（M2）

- Redis、消息队列、多租户部署。  
