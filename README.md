# AIdea · 爱点子

一个面向个人 AI 学习成长的全栈工具。知识管理 + AI 对话 + 实验记录，帮你把每一个爱点子沉淀下来。

目标是先交付基于 `uni-app` 的 H5 版本，再逐步演进到移动端应用。

## 当前内容

- `docs/product-requirements.md`：产品需求文档
- `docs/technical-design.md`：技术实施方案
- `docs/data-model.md`：数据模型设计
- `docs/milestones.md`：里程碑与任务拆分
- `apps/client`：前端应用占位目录
- `apps/api`：后端服务占位目录
- `packages/shared`：共享类型与常量
- `packages/config`：配置驱动定义与 schema
- `packages/ui`：通用 UI 组件包

## 推荐下一步

1. 初始化 `apps/client` 的 `uni-app` 工程
2. 初始化 `apps/api` 的 `NestJS` 工程
3. 按 `docs/data-model.md` 建立 `Prisma schema`
4. 先打通 `auth -> knowledge -> notes -> ai -> experiments` 主流程
