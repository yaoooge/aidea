import { getAppShellConfig } from './app-shell.js';

// 重新导出 schema 层的所有公共 API，外部只需引用本文件
export type {
  AppShellConfigParsed,
  NavItemConfig,
  DashboardCardConfig,
  AiToolConfig,
} from './schemas/app-shell.js';
export {
  validateAppShellConfig,
  safeParseAppShellConfig,
  getAppShellConfig,
  resetAppShellConfigCache,
  appShellConfigRaw,
} from './app-shell.js';

// 模块加载时一次性初始化，后续访问均走 getAppShellConfig 内部缓存
const config = getAppShellConfig();

/** 已校验的导航配置 */
export const navigationConfig = config.navigation;

/** 已校验的 Dashboard 卡片配置 */
export const dashboardCardConfig = config.dashboardCards;

/** 已校验的 AI 工具配置 */
export const aiToolConfig = config.aiTools;
