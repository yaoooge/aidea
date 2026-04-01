import { describe, it, expect } from 'vitest';
import { USER_ROLES, CHAT_CONTEXT_TYPES } from './index';

describe('@ail/shared', () => {
  it('exports expected user roles', () => {
    expect(USER_ROLES).toContain('admin');
    expect(USER_ROLES).toContain('member');
  });

  it('exports chat context types', () => {
    expect(CHAT_CONTEXT_TYPES.length).toBeGreaterThan(0);
  });
});
