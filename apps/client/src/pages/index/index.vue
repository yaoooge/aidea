<template>
  <AppShell current-page="dashboard" @navigate="handleNavigate">

    <view class="dash">

      <!-- ═══════ Page Header ═══════ -->
      <view class="dash-header">
        <!-- Mobile brand (hidden on desktop) -->
        <view class="dash-header-mobile">
          <view class="dash-logo">
            <text class="dash-logo-t">AI</text>
          </view>
          <view class="dash-brand-text">
            <text class="dash-brand-name">AIdea</text>
            <text class="dash-brand-sub">2026 · 知识助手</text>
          </view>
        </view>
        <!-- Desktop title (hidden on mobile) -->
        <view class="dash-header-desktop">
          <text class="dash-page-title">学习概览</text>
          <text class="dash-page-date">Dashboard</text>
        </view>
        <!-- Action button -->
        <view class="dash-header-btn" @click="handleNew">
          <text class="dash-header-btn-icon">+</text>
        </view>
      </view>

      <!-- ═══════ Stats ═══════ -->
      <view class="dash-section">
        <view class="stats-row">
          <view
            v-for="stat in stats"
            :key="stat.key"
            class="stat-card"
            :style="{ '--stat-color': stat.color }"
          >
            <view class="stat-icon-wrap">
              <text class="stat-symbol">{{ stat.symbol }}</text>
            </view>
            <text class="stat-value">{{ stat.value }}</text>
            <text class="stat-label">{{ stat.label }}</text>
            <text class="stat-trend">↑ {{ stat.trend }}</text>
          </view>
        </view>
      </view>

      <!-- ═══════ Recent Activity ═══════ -->
      <view class="dash-section">
        <view class="section-header">
          <text class="section-title">最近活动</text>
          <text class="section-more">查看全部 ›</text>
        </view>
        <view class="activity-list">
          <view
            v-for="(card, idx) in enabledCards"
            :key="card.key"
            class="activity-item"
          >
            <view
              class="activity-accent"
              :style="{ background: activityColors[idx % activityColors.length] }"
            ></view>
            <view
              class="activity-icon"
              :style="{ background: activityColorsMuted[idx % activityColorsMuted.length] }"
            >
              <text
                class="activity-icon-t"
                :style="{ color: activityColors[idx % activityColors.length] }"
              >{{ activitySymbols[idx % activitySymbols.length] }}</text>
            </view>
            <view class="activity-body">
              <text class="activity-name">{{ card.title }}</text>
              <text class="activity-hint">{{ activityHints[card.key] }}</text>
            </view>
            <text class="activity-time">{{ activityTimes[idx] }}</text>
          </view>
        </view>
      </view>

      <!-- ═══════ AI Tools ═══════ -->
      <view class="dash-section dash-section-last">
        <view class="section-header">
          <text class="section-title">AI 工具</text>
          <view class="tools-count-badge">
            <text class="tools-count-t">3 可用</text>
          </view>
        </view>
        <view class="tools-card">
          <text class="tools-desc">
            使用 AI 总结知识、解释概念、生成学习计划，让学习更高效。
          </text>
          <view class="tools-chips">
            <view
              v-for="(tool, idx) in aiToolConfig"
              :key="tool.key"
              class="tool-chip"
            >
              <view
                class="tool-chip-dot"
                :style="{ background: toolChipColors[idx % toolChipColors.length] }"
              ></view>
              <text class="tool-chip-name">{{ tool.title }}</text>
            </view>
          </view>
          <view class="tools-cta">
            <text class="tools-cta-t">开始使用</text>
            <text class="tools-cta-arrow">→</text>
          </view>
        </view>
      </view>

      <!-- ═══════ FAB (mobile only) ═══════ -->
      <view class="dash-fab" @click="handleNew">
        <text class="dash-fab-icon">+</text>
      </view>

    </view>
  </AppShell>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { dashboardCardConfig, aiToolConfig, navigationConfig } from '@ail/config';
import AppShell from '../../components/AppShell.vue';

const enabledCards = computed(() => dashboardCardConfig.filter((c) => c.enabled));

const stats = [
  { key: 'knowledge',    symbol: '◎', value: '32', label: '知识卡',  trend: '3 本周', color: '#FF9F43' },
  { key: 'notes',        symbol: '◻', value: '14', label: '笔记',    trend: '2 本周', color: '#A78BFA' },
  { key: 'experiments',  symbol: '◇', value: '8',  label: '实验',    trend: '1 本周', color: '#60A5FA' },
];

const activityColors      = ['#3DD68C', '#FF9F43', '#FF6B6B'];
const activityColorsMuted = ['#E8FAF0', '#FFF3E4', '#FFF1F1'];
const activitySymbols     = ['◈', '◎', '◇'];

const activityHints: Record<string, string> = {
  overview:              '学习总览',
  'recent-knowledge':    '最新知识记录',
  'recent-experiments':  '最近实验',
};

const activityTimes = ['今天', '昨天', '明天'];

const toolChipColors = ['#3DD68C', '#FF9F43', '#A78BFA'];

function handleNavigate(key: string) {
  if (key === 'dashboard') return;
  const item = navigationConfig.find((n) => n.key === key);
  if (!item) {
    uni.showToast({ title: '功能开发中', icon: 'none', duration: 1500 });
    return;
  }
  uni.navigateTo({ url: item.path });
}

function handleNew() {
  uni.showToast({ title: '新建功能开发中', icon: 'none', duration: 1500 });
}
</script>

<style>
/* ─────────────────────────────────────────────────────────
   Dashboard wrapper
───────────────────────────────────────────────────────── */
.dash {
  min-height: 100vh;
  background: var(--ail-bg);
}

/* ─────────────────────────────────────────────────────────
   Page Header
───────────────────────────────────────────────────────── */
.dash-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 56rpx 36rpx 28rpx;
  background: var(--ail-surface);
  border-bottom: 1px solid var(--ail-divider);
}

.dash-header-mobile {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 18rpx;
  flex: 1;
}

.dash-logo {
  width: 68rpx;
  height: 68rpx;
  border-radius: 18rpx;
  background: var(--ail-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4rpx 14rpx rgba(61, 214, 140, 0.32);
  flex-shrink: 0;
}

.dash-logo-t {
  font-size: 24rpx;
  font-weight: 700;
  color: #fff;
  font-family: 'Outfit', sans-serif;
  letter-spacing: 0.5rpx;
}

.dash-brand-text {
  display: flex;
  flex-direction: column;
  gap: 2rpx;
}

.dash-brand-name {
  display: block;
  font-size: 30rpx;
  font-weight: 700;
  color: var(--ail-text-primary);
  font-family: 'Outfit', 'PingFang SC', sans-serif;
  letter-spacing: -0.5rpx;
  line-height: 1.25;
}

.dash-brand-sub {
  display: block;
  font-size: 22rpx;
  color: var(--ail-text-secondary);
  font-family: 'Outfit', sans-serif;
}

/* Desktop header title — hidden on mobile */
.dash-header-desktop {
  display: none;
  flex: 1;
  flex-direction: column;
  gap: 3px;
}

.dash-page-title {
  font-size: 20px;
  font-weight: 700;
  color: var(--ail-text-primary);
  font-family: 'Outfit', 'PingFang SC', sans-serif;
  letter-spacing: -0.3px;
  line-height: 1.2;
}

.dash-page-date {
  font-size: 12px;
  color: var(--ail-text-secondary);
  font-family: 'Outfit', sans-serif;
}

/* Action button */
.dash-header-btn {
  width: 68rpx;
  height: 68rpx;
  border-radius: 50%;
  background: var(--ail-primary-muted);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
}

.dash-header-btn-icon {
  font-size: 36rpx;
  color: var(--ail-primary);
  font-weight: 400;
  line-height: 1;
  margin-top: -2rpx;
}

/* ─────────────────────────────────────────────────────────
   Sections
───────────────────────────────────────────────────────── */
.dash-section {
  padding: 36rpx 36rpx 0;
}

.dash-section-last {
  padding-bottom: 40rpx;
}

.section-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 22rpx;
}

.section-title {
  font-size: 28rpx;
  font-weight: 700;
  color: var(--ail-text-primary);
  font-family: 'Outfit', 'PingFang SC', sans-serif;
}

.section-more {
  font-size: 24rpx;
  color: var(--ail-primary);
  font-family: 'Outfit', sans-serif;
  font-weight: 500;
  cursor: pointer;
}

/* ─────────────────────────────────────────────────────────
   Stats row
───────────────────────────────────────────────────────── */
.stats-row {
  display: flex;
  flex-direction: row;
  gap: 18rpx;
}

.stat-card {
  flex: 1;
  background: var(--ail-surface);
  border-radius: var(--ail-radius-md);
  padding: 24rpx 20rpx 22rpx;
  box-shadow: var(--ail-shadow-sm);
  display: flex;
  flex-direction: column;
  gap: 5rpx;
  border-top: 3rpx solid var(--stat-color, var(--ail-primary));
  overflow: hidden;
}

.stat-icon-wrap {
  width: 48rpx;
  height: 48rpx;
  border-radius: 12rpx;
  background: rgba(0, 0, 0, 0.04);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8rpx;
  flex-shrink: 0;
}

.stat-symbol {
  font-size: 20rpx;
  color: var(--stat-color, var(--ail-primary));
  line-height: 1;
}

.stat-value {
  display: block;
  font-size: 48rpx;
  font-weight: 700;
  color: var(--ail-text-primary);
  font-family: 'Outfit', sans-serif;
  line-height: 1.05;
}

.stat-label {
  display: block;
  font-size: 21rpx;
  color: var(--ail-text-secondary);
  font-family: 'Outfit', 'PingFang SC', sans-serif;
}

.stat-trend {
  display: block;
  font-size: 19rpx;
  color: var(--ail-primary);
  font-family: 'Outfit', sans-serif;
  font-weight: 500;
  margin-top: 6rpx;
}

/* ─────────────────────────────────────────────────────────
   Activity list
───────────────────────────────────────────────────────── */
.activity-list {
  background: var(--ail-surface);
  border-radius: var(--ail-radius-md);
  box-shadow: var(--ail-shadow-sm);
  overflow: hidden;
}

.activity-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20rpx;
  padding: 28rpx 28rpx 28rpx 24rpx;
  border-bottom: 1rpx solid var(--ail-divider);
  position: relative;
}

.activity-item:last-child {
  border-bottom: none;
}

.activity-accent {
  position: absolute;
  left: 0;
  top: 16rpx;
  bottom: 16rpx;
  width: 4rpx;
  border-radius: 0 3rpx 3rpx 0;
}

.activity-icon {
  width: 60rpx;
  height: 60rpx;
  border-radius: 14rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.activity-icon-t {
  font-size: 22rpx;
  font-weight: 600;
  line-height: 1;
}

.activity-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 5rpx;
}

.activity-name {
  font-size: 28rpx;
  font-weight: 600;
  color: var(--ail-text-primary);
  font-family: 'Outfit', 'PingFang SC', sans-serif;
  line-height: 1.2;
}

.activity-hint {
  font-size: 22rpx;
  color: var(--ail-text-secondary);
  font-family: 'Outfit', 'PingFang SC', sans-serif;
}

.activity-time {
  font-size: 22rpx;
  color: var(--ail-text-tertiary);
  font-family: 'Outfit', sans-serif;
  flex-shrink: 0;
}

/* ─────────────────────────────────────────────────────────
   AI Tools card
───────────────────────────────────────────────────────── */
.tools-count-badge {
  background: var(--ail-primary-muted);
  border-radius: var(--ail-radius-full);
  padding: 4rpx 18rpx;
}

.tools-count-t {
  font-size: 21rpx;
  color: var(--ail-primary);
  font-weight: 600;
  font-family: 'Outfit', sans-serif;
}

.tools-card {
  background: var(--ail-surface);
  border-radius: var(--ail-radius-md);
  padding: 32rpx 28rpx;
  box-shadow: var(--ail-shadow-sm);
  display: flex;
  flex-direction: column;
  gap: 24rpx;
}

.tools-desc {
  font-size: 26rpx;
  color: var(--ail-text-secondary);
  line-height: var(--ail-line-height-loose);
  font-family: 'Outfit', 'PingFang SC', sans-serif;
}

.tools-chips {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 14rpx;
}

.tool-chip {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8rpx;
  padding: 10rpx 20rpx;
  background: var(--ail-bg);
  border-radius: var(--ail-radius-full);
  border: 1.5rpx solid var(--ail-border);
}

.tool-chip-dot {
  width: 12rpx;
  height: 12rpx;
  border-radius: 50%;
  flex-shrink: 0;
}

.tool-chip-name {
  font-size: 23rpx;
  color: var(--ail-text-primary);
  font-family: 'Outfit', 'PingFang SC', sans-serif;
  font-weight: 500;
}

.tools-cta {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 22rpx 28rpx;
  background: var(--ail-primary);
  border-radius: var(--ail-radius-md);
  cursor: pointer;
}

.tools-cta-t {
  font-size: 28rpx;
  color: #fff;
  font-weight: 600;
  font-family: 'Outfit', 'PingFang SC', sans-serif;
}

.tools-cta-arrow {
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.80);
}

/* ─────────────────────────────────────────────────────────
   FAB — mobile only
───────────────────────────────────────────────────────── */
.dash-fab {
  position: fixed;
  right: 36rpx;
  bottom: calc(64px + 20rpx);
  width: 96rpx;
  height: 96rpx;
  border-radius: 50%;
  background: var(--ail-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--ail-shadow-primary);
  z-index: 500;
  cursor: pointer;
}

.dash-fab-icon {
  font-size: 52rpx;
  color: #fff;
  font-weight: 300;
  line-height: 1;
  margin-top: -4rpx;
}

/* ─────────────────────────────────────────────────────────
   Desktop overrides
───────────────────────────────────────────────────────── */
@media screen and (min-width: 768px) {
  /* Swap mobile header for desktop header */
  .dash-header-mobile {
    display: none;
  }

  .dash-header-desktop {
    display: flex;
  }

  .dash-header {
    padding: 20px 28px;
  }

  .dash-header-btn {
    width: 38px;
    height: 38px;
    border-radius: 9px;
    background: var(--ail-primary);
    box-shadow: 0 2px 8px rgba(61, 214, 140, 0.28);
  }

  .dash-header-btn-icon {
    font-size: 20px;
    color: #fff;
  }

  /* Sections */
  .dash-section {
    padding: 22px 28px 0;
  }

  .dash-section-last {
    padding-bottom: 32px;
  }

  .section-title {
    font-size: 14px;
    font-weight: 700;
  }

  .section-more {
    font-size: 12px;
  }

  /* Stats */
  .stats-row {
    gap: 14px;
  }

  .stat-card {
    padding: 18px 16px;
    border-radius: 12px;
    border-top-width: 2px;
    gap: 3px;
  }

  .stat-icon-wrap {
    width: 28px;
    height: 28px;
    border-radius: 7px;
    margin-bottom: 6px;
  }

  .stat-symbol {
    font-size: 12px;
  }

  .stat-value {
    font-size: 28px;
    line-height: 1.1;
  }

  .stat-label {
    font-size: 11px;
  }

  .stat-trend {
    font-size: 10px;
    margin-top: 4px;
  }

  /* Activity */
  .section-header {
    margin-bottom: 12px;
  }

  .activity-item {
    padding: 14px 16px 14px 12px;
    gap: 12px;
  }

  .activity-accent {
    top: 8px;
    bottom: 8px;
    width: 2px;
  }

  .activity-icon {
    width: 34px;
    height: 34px;
    border-radius: 8px;
  }

  .activity-icon-t {
    font-size: 13px;
  }

  .activity-name {
    font-size: 13px;
  }

  .activity-hint {
    font-size: 11px;
  }

  .activity-time {
    font-size: 11px;
  }

  /* Tools */
  .tools-count-badge {
    padding: 3px 10px;
  }

  .tools-count-t {
    font-size: 11px;
  }

  .tools-card {
    padding: 18px 16px;
    border-radius: 12px;
    gap: 14px;
  }

  .tools-desc {
    font-size: 12.5px;
    line-height: 1.65;
  }

  .tools-chips {
    gap: 8px;
  }

  .tool-chip {
    padding: 6px 12px;
    border-radius: 20px;
    gap: 5px;
    border-width: 1px;
  }

  .tool-chip-dot {
    width: 7px;
    height: 7px;
  }

  .tool-chip-name {
    font-size: 12px;
  }

  .tools-cta {
    padding: 12px 16px;
    border-radius: 8px;
  }

  .tools-cta-t {
    font-size: 13px;
  }

  .tools-cta-arrow {
    font-size: 14px;
  }

  /* Hide FAB on desktop */
  .dash-fab {
    display: none;
  }
}
</style>
