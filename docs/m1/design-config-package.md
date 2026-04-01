# M1-CFG · packages/config 设计

## 目标

建立 **配置 schema（Zod）** 与 **校验加载**，保证 `navigationConfig`、`dashboardCardConfig`、`aiToolConfig` 在运行前可通过同一套规则校验；与 `docs/milestones.md` 中「配置 schema 与配置加载机制」一致。

## TDD 顺序

1. 编写 `parseAndValidateAppShellConfig`（或等价命名）的测试：合法快照通过、非法数据抛错（带 `ZodError` 或包装错误）
2. 实现 schema 与解析函数
3. 导出：`getAppShellConfig()` 返回 **已校验** 的默认配置（M1 以代码内默认配置为数据源；后续可接文件/远端）

## Schema 范围（M1）

- `NavItemConfig[]`：`key`、`title`、`path` 必填字符串
- `DashboardCardConfig[]`：`key`、`title`、`enabled` boolean
- `AiToolConfig[]`：`key`、`title`、`inputMode` 枚举

## 文件建议

```
packages/config/src/
  schemas/app-shell.ts      # zod schemas
  app-shell.ts              # 默认数据 + getAppShellConfig()
  index.ts                  # 对外导出
packages/config/src/__tests__/app-shell.spec.ts
```

## 验收

- [ ] `npm run test --workspace @ail/config` 通过
- [ ] 对外仍导出导航/卡片/AI 工具配置，且经同一校验入口
