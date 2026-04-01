# M1 · 工具链设计（ESLint / Prettier / TS）

## 目标

根目录统一 **ESLint 9 flat config** 与 **Prettier**，各 workspace 通过根脚本聚合 `lint`（`--workspaces --if-present`）。

## 约定

- TypeScript：`tsconfig.base.json` 为各包 `extends` 参考（子包可局部覆盖 `moduleResolution` 等）
- Lint：根 `eslint.config.js` 使用 `@eslint/js` + `typescript-eslint`，`ignores` 含 `dist`、`node_modules`、uni 生成目录
- Format：根 `.prettierrc`，忽略 `pnpm-lock.yaml` 等（若存在）

## 根脚本

- `npm run lint` — 各 workspace `lint` 聚合
- `npm run test` — 各 workspace `test` 聚合
- `npm run build` — 各 workspace `build` 聚合

## 验收

- [ ] 根目录执行 `npm run lint` 无报错（或仅已知例外已文档说明）
- [ ] Prettier 可格式化根目录已纳入的文件类型
