# M1-SHR · packages/shared 设计

## 目标

为共享类型与常量建立 **最小测试基线**，满足里程碑「测试目录约定与测试运行脚本」在 monorepo 内的可执行性。

## TDD 顺序

1. 添加针对 `USER_ROLES`（或导出常量集合）的断言用例
2. 保持实现不变或仅补充 `package.json` 的 `test` 脚本

## 验收

- [ ] `npm run test --workspace @ail/shared` 通过
