# M1-INIT · 工程初始化设计

## 目标

满足里程碑：本地 Git、`.gitignore`、主分支与分支命名约定、根 `package.json` 与 `npm workspaces`、文档入口。

## 范围

- 仓库已存在时：**不重复** `git init`，仅补充文档与忽略规则（若缺失）。
- 在根目录提供 **环境变量约定**（`.env.example`）与 **协作说明**（`CONTRIBUTING.md` 或并入 `WORKFLOW.md`）。

## 分支与提交约定

- 默认主分支：`main`
- 功能分支：`feat/<short-name>`、`fix/<short-name>`、`chore/<short-name>`
- 提交信息：建议 Conventional Commits（`feat:`、`fix:`、`chore:`、`docs:`、`test:`）

## 验收

- [ ] 根目录存在 `WORKFLOW.md`，指向 TDD 与脚本说明
- [ ] 存在 `.env.example`（根或分应用说明清晰）
- [ ] `.gitignore` 覆盖 `node_modules`、`dist`、`.env`、`.env.local` 等

## 非目标（M1）

- CI/CD、Husky、复杂发布流水线
