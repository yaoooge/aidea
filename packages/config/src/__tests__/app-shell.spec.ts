import { describe, it, expect, beforeEach } from 'vitest';
import { ZodError } from 'zod';
import {
  getAppShellConfig,
  validateAppShellConfig,
  resetAppShellConfigCache,
  appShellConfigRaw,
} from '../app-shell.js';

describe('app shell config', () => {
  beforeEach(() => {
    resetAppShellConfigCache();
  });

  it('getAppShellConfig returns validated navigation with expected keys', () => {
    const cfg = getAppShellConfig();
    expect(cfg.navigation.length).toBe(5);
    expect(cfg.navigation.map((n) => n.key)).toEqual([
      'dashboard',
      'knowledge',
      'notes',
      'experiments',
      'chat',
    ]);
    expect(cfg.dashboardCards.every((c) => typeof c.enabled === 'boolean')).toBe(true);
    expect(cfg.aiTools.length).toBe(3);
  });

  it('validateAppShellConfig rejects invalid navigation item', () => {
    const bad = {
      ...appShellConfigRaw,
      navigation: [{ key: 'x', title: '', path: '/p' }],
    };
    expect(() => validateAppShellConfig(bad)).toThrow(ZodError);
  });

  it('validateAppShellConfig rejects bad aiTool inputMode', () => {
    const bad = {
      ...appShellConfigRaw,
      aiTools: [{ key: 'k', title: 't', inputMode: 'nope' }],
    };
    expect(() => validateAppShellConfig(bad)).toThrow(ZodError);
  });
});
