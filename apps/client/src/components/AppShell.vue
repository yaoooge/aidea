<template>
  <view class="shell">

    <!-- ═══════════ SIDEBAR (desktop) ═══════════ -->
    <view class="shell-sidebar">
      <view class="sb-brand">
        <view class="sb-logo">
          <text class="sb-logo-label">AI</text>
        </view>
        <view class="sb-brand-text">
          <text class="sb-app-name">AIdea</text>
          <text class="sb-app-sub">知识助手</text>
        </view>
      </view>

      <view class="sb-nav">
        <text class="sb-nav-group-label">主菜单</text>
        <view
          v-for="item in navItems"
          :key="item.key"
          class="sb-nav-item"
          :class="{ 'sb-nav-active': currentPage === item.key }"
          @click="onNavClick(item.key)"
        >
          <view class="sb-nav-bar"></view>
          <view class="sb-nav-icon-wrap">
            <text class="sb-nav-symbol">{{ icons[item.key] }}</text>
          </view>
          <text class="sb-nav-title">{{ item.title }}</text>
          <view v-if="item.key === 'chat'" class="sb-ai-badge">
            <text class="sb-ai-badge-t">AI</text>
          </view>
        </view>
      </view>

      <view class="sb-footer">
        <view class="sb-divider"></view>
        <view class="sb-user">
          <view class="sb-avatar">
            <text class="sb-avatar-t">学</text>
          </view>
          <view class="sb-user-meta">
            <text class="sb-user-name">学习者</text>
            <view class="sb-online-row">
              <view class="sb-online-dot"></view>
              <text class="sb-online-label">在线</text>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- ═══════════ MAIN CONTENT ═══════════ -->
    <view class="shell-content">
      <slot></slot>
    </view>

    <!-- ═══════════ BOTTOM NAV (mobile) ═══════════ -->
    <view class="shell-bottom-nav">
      <view
        v-for="item in navItems"
        :key="item.key"
        class="bn-item"
        :class="{ 'bn-active': currentPage === item.key }"
        @click="onNavClick(item.key)"
      >
        <view class="bn-pip"></view>
        <text class="bn-icon">{{ icons[item.key] }}</text>
        <text class="bn-label">{{ item.title }}</text>
      </view>
    </view>

  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { navigationConfig } from '@ail/config';

withDefaults(defineProps<{ currentPage?: string }>(), { currentPage: 'dashboard' });
const emit = defineEmits<{ navigate: [key: string] }>();

/** M2：仅展示已实现入口；其余保留在 config 供后续迭代 */
const navKeysM2 = new Set(['dashboard', 'learning', 'knowledge', 'settings']);
const navItems = computed(() => navigationConfig.filter((i) => navKeysM2.has(i.key)));

const icons: Record<string, string> = {
  dashboard:   '◈',
  learning:    '▸',
  knowledge:   '◎',
  settings:    '⚙',
  notes:       '◻',
  experiments: '◇',
  chat:        '◉',
};

function onNavClick(key: string) {
  emit('navigate', key);
}
</script>

<style>
/* ─────────────────────────────────────────────────────────
   Shell root
───────────────────────────────────────────────────────── */
.shell {
  min-height: 100vh;
  background: var(--ail-bg);
  display: flex;
  flex-direction: column;
}

/* ─────────────────────────────────────────────────────────
   Sidebar — hidden by default (mobile-first)
───────────────────────────────────────────────────────── */
.shell-sidebar {
  display: none;
}

/* ─────────────────────────────────────────────────────────
   Main content
───────────────────────────────────────────────────────── */
.shell-content {
  flex: 1;
  background: var(--ail-bg);
  padding-bottom: 72px; /* clear fixed bottom nav */
}

/* ─────────────────────────────────────────────────────────
   Bottom navigation
───────────────────────────────────────────────────────── */
.shell-bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 64px;
  background: var(--ail-sidebar-bg);
  border-top: 1px solid var(--ail-sidebar-border);
  display: flex;
  flex-direction: row;
  z-index: 1000;
  padding-bottom: env(safe-area-inset-bottom, 0px);
}

.bn-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3px;
  cursor: pointer;
  padding: 8px 4px 6px;
  position: relative;
  transition: opacity 0.12s;
}

.bn-pip {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 2px;
  background: var(--ail-primary);
  border-radius: 0 0 3px 3px;
  transition: width 0.22s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.bn-active .bn-pip {
  width: 20px;
}

.bn-icon {
  font-size: 16px;
  color: var(--ail-sidebar-text-muted);
  line-height: 1;
  transition: color 0.15s;
}

.bn-active .bn-icon {
  color: var(--ail-primary);
}

.bn-label {
  font-size: 9.5px;
  font-weight: 500;
  color: var(--ail-sidebar-text-muted);
  font-family: 'Outfit', 'PingFang SC', sans-serif;
  transition: color 0.15s;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 56px;
}

.bn-active .bn-label {
  color: var(--ail-primary);
  font-weight: 600;
}

/* ─────────────────────────────────────────────────────────
   Desktop breakpoint
───────────────────────────────────────────────────────── */
@media screen and (min-width: 768px) {
  .shell {
    flex-direction: row;
  }

  /* Show sidebar */
  .shell-sidebar {
    display: flex;
    flex-direction: column;
    width: 232px;
    min-height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    background: var(--ail-sidebar-bg);
    border-right: 1px solid var(--ail-sidebar-border);
    z-index: 200;
    overflow: hidden;
  }

  /* Offset content by sidebar width */
  .shell-content {
    margin-left: 232px;
    padding-bottom: 0;
    min-height: 100vh;
    width: calc(100% - 232px);
  }

  /* Hide bottom nav */
  .shell-bottom-nav {
    display: none;
  }
}

/* ─────────────────────────────────────────────────────────
   Sidebar — Brand
───────────────────────────────────────────────────────── */
.sb-brand {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 11px;
  padding: 24px 16px 20px;
  border-bottom: 1px solid var(--ail-sidebar-border);
  flex-shrink: 0;
}

.sb-logo {
  width: 34px;
  height: 34px;
  border-radius: 9px;
  background: var(--ail-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 3px 10px rgba(61, 214, 140, 0.32);
}

.sb-logo-label {
  font-size: 12px;
  font-weight: 700;
  color: #fff;
  font-family: 'Outfit', sans-serif;
  letter-spacing: 0.5px;
}

.sb-brand-text {
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.sb-app-name {
  display: block;
  font-size: 15px;
  font-weight: 700;
  color: var(--ail-sidebar-text-primary);
  font-family: 'Outfit', sans-serif;
  letter-spacing: -0.3px;
  line-height: 1.25;
}

.sb-app-sub {
  display: block;
  font-size: 10.5px;
  color: var(--ail-sidebar-text-muted);
  font-family: 'Outfit', sans-serif;
  line-height: 1;
}

/* ─────────────────────────────────────────────────────────
   Sidebar — Navigation
───────────────────────────────────────────────────────── */
.sb-nav {
  flex: 1;
  padding: 16px 10px;
  display: flex;
  flex-direction: column;
  gap: 1px;
  overflow-y: auto;
}

.sb-nav-group-label {
  display: block;
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 1.4px;
  text-transform: uppercase;
  color: var(--ail-sidebar-text-muted);
  padding: 0 6px 10px;
  font-family: 'Outfit', sans-serif;
}

.sb-nav-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 9px;
  padding: 9px 8px 9px 4px;
  border-radius: 8px;
  cursor: pointer;
  position: relative;
  transition: background 0.13s ease;
}

.sb-nav-item:active {
  opacity: 0.7;
}

/* Hover tint */
.sb-nav-item:hover {
  background: var(--ail-sidebar-hover);
}

/* Active state */
.sb-nav-active {
  background: var(--ail-sidebar-active-bg);
}

/* Active left-bar indicator */
.sb-nav-bar {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 0;
  background: var(--ail-primary);
  border-radius: 0 2px 2px 0;
  transition: height 0.22s cubic-bezier(0.34, 1.56, 0.64, 1);
  flex-shrink: 0;
}

.sb-nav-active .sb-nav-bar {
  height: 18px;
}

.sb-nav-icon-wrap {
  width: 28px;
  height: 28px;
  border-radius: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  flex-shrink: 0;
  transition: background 0.13s;
}

.sb-nav-active .sb-nav-icon-wrap {
  background: rgba(61, 214, 140, 0.14);
}

.sb-nav-symbol {
  font-size: 12px;
  color: var(--ail-sidebar-text-secondary);
  line-height: 1;
  transition: color 0.13s;
}

.sb-nav-active .sb-nav-symbol {
  color: var(--ail-primary);
}

.sb-nav-title {
  flex: 1;
  font-size: 13px;
  font-weight: 500;
  color: var(--ail-sidebar-text-secondary);
  font-family: 'Outfit', 'PingFang SC', sans-serif;
  transition: color 0.13s;
  line-height: 1;
}

.sb-nav-active .sb-nav-title {
  color: var(--ail-sidebar-text-primary);
  font-weight: 600;
}

.sb-nav-item:hover .sb-nav-title {
  color: var(--ail-sidebar-text-primary);
}

.sb-ai-badge {
  padding: 2px 6px;
  border-radius: 20px;
  background: rgba(61, 214, 140, 0.13);
  flex-shrink: 0;
  transition: background 0.13s;
}

.sb-nav-active .sb-ai-badge {
  background: var(--ail-primary);
}

.sb-ai-badge-t {
  font-size: 9.5px;
  font-weight: 700;
  color: var(--ail-primary);
  font-family: 'Outfit', sans-serif;
  letter-spacing: 0.5px;
  transition: color 0.13s;
}

.sb-nav-active .sb-ai-badge-t {
  color: #fff;
}

/* ─────────────────────────────────────────────────────────
   Sidebar — Footer / User
───────────────────────────────────────────────────────── */
.sb-footer {
  padding: 8px 10px 16px;
  flex-shrink: 0;
}

.sb-divider {
  height: 1px;
  background: var(--ail-sidebar-border);
  margin-bottom: 8px;
}

.sb-user {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 9px;
  padding: 8px 8px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.13s;
}

.sb-user:hover {
  background: var(--ail-sidebar-hover);
}

.sb-avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: linear-gradient(135deg, #3DD68C 0%, #22A96A 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.sb-avatar-t {
  font-size: 12px;
  font-weight: 700;
  color: #fff;
  font-family: 'Outfit', sans-serif;
}

.sb-user-meta {
  flex: 1;
}

.sb-user-name {
  display: block;
  font-size: 12.5px;
  font-weight: 600;
  color: var(--ail-sidebar-text-primary);
  font-family: 'Outfit', 'PingFang SC', sans-serif;
  line-height: 1.3;
}

.sb-online-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
  margin-top: 2px;
}

.sb-online-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--ail-primary);
  box-shadow: 0 0 5px rgba(61, 214, 140, 0.65);
}

.sb-online-label {
  font-size: 10px;
  color: var(--ail-sidebar-text-muted);
  font-family: 'Outfit', sans-serif;
}
</style>
