# M1-API · apps/api 设计

## 目标

**NestJS** 可本地启动，提供最小可读 REST 能力；M1 以 **健康检查** 为主，作为后续模块挂载骨架。

## TDD 顺序

1. 编写 e2e 或集成测试：`GET /health` 返回 `200`，body 含 `status: 'ok'`（或项目约定字段）
2. 实现 `AppModule`、`HealthController`（或等价）
3. `npm run dev` 可监听端口（默认 `process.env.PORT || 3000`）

## 环境变量（M1）

- `PORT`：可选，默认 `3000`
- `API_PREFIX`：可选，M1 可省略；若设置则全局前缀（测试需对齐）

## 脚本

- `dev`：`nest start --watch` 或 `ts-node-dev` / `tsx` 等价（以依赖为准）
- `build`：`nest build`
- `test`：Jest 或 Vitest（与根聚合一致即可）

## 验收

- [ ] `npm run dev --workspace @ail/api` 可启动
- [ ] `npm run test --workspace @ail/api` 通过
