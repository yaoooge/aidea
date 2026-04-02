# M2 · 笔记能力延后说明

## 决策

按产品迭代安排，**笔记 CRUD、笔记关联知识、笔记相关页面** 从 M2 **整体移到下一阶段**（可与 `docs/milestones.md` 后续修订中「M2.5 / M3 前置」对齐）。

## 对数据层的影响

- **M2 migration**：可不创建 `Note`、`NoteKnowledgeRef`；若希望下一阶段少一次 migration，也可 **建表但无 API、无前端** — 由实现时择一，**默认推荐 M2 不建表**，保持 schema 与交付范围一致。  

## 对测试的影响

- 集成测试 **不包含** 笔记；原 `design-open-questions.md` Q8A 在笔记移除后，覆盖 **知识、分类标签、偏好、`/learning/entry`、预留的 `POST /auth/login`**。  

## 后续衔接

- 下一阶段启用时：补表、REST、`NoteKnowledgeRef`、页面与测试；与本阶段 **知识条目** 直接对接。  

本文件替代原 `design-notes-refs.md` 的「M2 交付」语义；旧文件已删除或不再作为 M2 范围依据。  
