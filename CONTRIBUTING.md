# 贡献与分支约定

## Git

- 远程托管建议使用 GitHub（与 `docs/development-workflow.md` 一致）
- 小步提交，单次 PR/提交粒度保持可审查

## 分支命名

| 类型 | 格式 | 示例 |
|------|------|------|
| 新功能 | `feat/<short-name>` | `feat/auth-jwt` |
| 修复 | `fix/<short-name>` | `fix/login-redirect` |
| 杂项 | `chore/<short-name>` | `chore/eslint-flat` |

## 提交前

- `npm run test` 通过
- `npm run lint` 通过（若已配置）
- 与改动相关的 `docs/` 已更新

## 开发流程

见仓库根目录 `WORKFLOW.md` 与 `docs/development-workflow.md`。
