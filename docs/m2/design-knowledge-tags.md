# M2 · 知识、分类、标签

## 分类 Category

- CRUD；`slug` 在同一 `ownerUserId` 下唯一。
- **删除规则**：若仍有 `KnowledgeItem.categoryId` 指向该分类，**返回 409**，错误码 `CATEGORY_IN_USE`，前端提示用户先将相关知识条目的分类解绑或改为其他分类。
- 删除成功时不影响其他数据（Category 不级联任何关联，仅约束 KnowledgeItem.categoryId）。

## 标签 Tag

- CRUD；`name` 在 `ownerUserId` 下唯一。
- `color` 可选，格式为 HEX 字符串（如 `#FF5733`），对应 Prisma `String?`。
- **删除规则**：直接删除；关联的 `KnowledgeTag` 记录**级联删除**（Prisma `onDelete: Cascade`）。知识条目不受影响，只是失去该标签。

## 知识条目 KnowledgeItem

- 创建/更新：`title`、`summary`、`content`、`sourceUrl?`、`sourceType`、`categoryId?`、`tagIds[]`、`contentType`、`difficulty`（与 Prisma enum + `@ail/config` 一致）。
- **删除规则**：直接删除；关联的 `KnowledgeTag` 记录**级联删除**（Prisma `onDelete: Cascade`）。
- 列表：筛选 `categoryId`、`tagId`；搜索 **`q`** → **ILIKE `title` OR `summary`**（见 `design-api-m2.md`）。
- 详情：返回标签列表（含 id + name + color）与分类（含 id + name + slug），或仅 id + name 均可，实现时统一。

## 配置化（M2-F1）

- `@ail/config` 提供 `knowledgeFormFields`、`knowledgeListColumns` 等**子集**；前端循环渲染；**后端仍校验必填与枚举**。

## Prisma 级联配置参考

```prisma
// KnowledgeItem 与 Category（非级联，Category 删除时禁止）
categoryId String?
category   Category? @relation(fields: [categoryId], references: [id])

// KnowledgeTag（级联删除）
model KnowledgeTag {
  knowledgeItemId String
  tagId           String
  knowledgeItem   KnowledgeItem @relation(fields: [knowledgeItemId], references: [id], onDelete: Cascade)
  tag             Tag           @relation(fields: [tagId], references: [id], onDelete: Cascade)
  @@id([knowledgeItemId, tagId])
}
```

## TDD 建议

- 创建知识 + 多标签；列表 category/tag 筛选；`q` 命中标题与摘要。
- 删除仍有关联知识的 Category → 409。
- 删除 Tag → 200，对应 KnowledgeTag 记录消失，知识条目其余标签不受影响。
- 删除 KnowledgeItem → 200，对应 KnowledgeTag 记录消失。
