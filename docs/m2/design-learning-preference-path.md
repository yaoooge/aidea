# M2 · 学习偏好与学习路径（已确认方案）

## 已确认

- **偏好存储**：`User.preferences` 为 **Prisma `Json`**，形状对齐 `docs/ai-agent-learning-path.md` §9 `LearningPreferenceProfile`（见下方 schema）。
- **校验**：写入前 **Zod** 校验；字段均为可选，缺失字段回退默认值。
- **PATCH 策略**：**整对象替换** — 前端每次传完整 `preferences` 对象，后端 Zod 校验后整体覆盖写入 `User.preferences`。
- **路径骨架**：**仅** `packages/config` 内静态 registry（方向、路径、阶段、模块 key），与 `docs/ai-agent-learning-path.md` §8 收敛。
- **进度**：**不落库**；用户完成度属 **M3**。
- **API**：`GET /learning/entry` — 读取当前默认用户（**admin**）的 `preferredDirection`，返回当前推荐路径的标题、摘要、阶段/模块列表（静态）及排序/高亮提示（与「突出 AI Agent」一致）；详细 schema 见 `design-api-m2.md`。

## 偏好 Schema

```ts
// 与 docs/ai-agent-learning-path.md §9 LearningPreferenceProfile 对齐
// M2 扩展：preferredDirection 增加 'general'
interface LearningPreferences {
  background?: 'frontend-engineer' | 'backend-engineer' | 'generalist';
  goal?: 'job-switch' | 'skill-upgrade';
  preferredDirection?: 'ai-agent' | 'general';  // 缺失时默认 'ai-agent'
  pace?: 'light' | 'normal' | 'intensive';
}
```

- 所有字段均为可选；`PATCH /users/me` 传入的 preferences 整体替换，字段缺失时后端写入时保留 undefined（即 JSON 中无该 key）。
- `GET /learning/entry` 读取时，`preferredDirection` 若不存在则默认 `'ai-agent'`。

## null preferences 行为

- 新建用户 `preferences` 为 `null`（DB 默认）。
- `GET /users/me`：`preferences` 字段返回 `null` 或 `{}`，前端展示时按默认值处理。
- `GET /learning/entry`：`preferences` 为 `null` 时等同于 `preferredDirection = 'ai-agent'`，返回 AI Agent 专项路径。

## direction 行为说明

| `preferredDirection` | `/learning/entry` 行为 |
|----------------------|------------------------|
| `'ai-agent'`（或 null/缺失） | 返回 AI Agent 专项路径；`highlight` 包含 Agent 相关模块 key |
| `'general'` | 返回全量路径（所有阶段/模块）；`highlight` 为空数组 |
| 其他非法值 | **400**，`code: "INVALID_DIRECTION"` |

## 与核心目标的关系

本模块与 **M2-G1（config 包中的路径 + 知识元数据）** 同为迭代重点；前端**学习入口页**与**首页模块**优先消费 `GET /learning/entry` + 本地 config。

## TDD 建议

- 非法 `preferredDirection`（如 `"invalid"`）→ PATCH 返回 400。
- `preferredDirection = 'ai-agent'` → `/learning/entry` 返回 AI Agent 路径，`highlight` 非空。
- `preferredDirection = 'general'` → `/learning/entry` 返回全量路径，`highlight` 为空。
- `preferences = null` → `/learning/entry` 返回 AI Agent 路径（默认）。
