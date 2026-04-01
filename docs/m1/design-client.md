# M1-CLI · apps/client（uni-app H5）设计

## 目标

- **uni-app + Vue3 + Vite + TS** 本地 **H5** 开发链路可用（`dev:h5` 或根 `dev:client` 转发）
- **至少一类页面模块通过配置渲染**：使用 `@ail/config` 中导航配置渲染列表（或 Tab 文案列表）

## TDD 说明

工程脚手架（从模板拉取、改 `package.json`、Vite 别名）属 **M1-INIT/M1-CLI 初始化**，不设 TDD。  
**配置驱动展示** 的纯函数（若有，例如过滤 `enabled` 卡片）放在 `packages/config` 已测；页面以集成手动验收为主（M1）。

## Monorepo 集成

- `package.json`：`name` 为 `@ail/client`，`dependencies` 含 `"@ail/config": "*"`
- `vite.config.ts`：`resolve.alias` 指向 `../../packages/config/src`（或构建产物，M1 用源码即可）
- `tsconfig`：`paths` 增加 `@ail/config`（若需）

## 页面建议

- 启动页或 `pages/shell/index`：展示「来自配置的导航项」列表（`title` + `path` 文案）

## 验收

- [ ] `npm run dev:client`（根脚本）可启动 H5 开发服务
- [ ] 页面可见由 `navigationConfig` 驱动的列表
