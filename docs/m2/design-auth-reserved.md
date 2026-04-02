# M2 · 鉴权策略（默认 admin · 登录接口预留）

## 当前实现

- **不做**请求头 JWT 校验、不做会话登录门槛。全局 `DefaultAdminGuard` 在每次非 `@Public()` 请求时从数据库加载 **`username=admin`** 的活跃用户，写入 `req.user`（供按 `ownerUserId` 隔离的业务使用）。
- 若 seed 未创建 admin 或用户不可用，返回 **503**，错误码 `ADMIN_USER_MISSING`。
- **`GET /health`**、**`POST /auth/login`** 等标为 `@Public()` 的路由不经过上述注入。

## 预留

- **`POST /auth/login`**：仍校验用户名密码（bcrypt）、成功时签发 **JWT accessToken**（`JWT_SECRET` / `JWT_EXPIRES_IN`）。**当前业务路由不读取该 token**，仅保留接口与实现，便于后续恢复 Bearer 鉴权。
- **不提供** `POST /auth/register`（不开放注册）。

## 非目标（本阶段）

- OAuth、2FA、refresh token、找回密码、多租户注册流程。

## 数据

- 内置用户仍由 **Prisma seed** 维护：`username=admin` 等；默认口令仅限本地开发。
