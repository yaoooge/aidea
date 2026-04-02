<template>
  <AppShell current-page="settings" @navigate="handleNavigate">
    <view class="sp">

      <!-- ═══════ Learning direction ═══════ -->
      <view class="ail-section ail-section-first">
        <view class="ail-section-hd">
          <text class="ail-section-title">学习方向</text>
        </view>
        <view class="ail-card sp-card">
          <picker :range="dirLabels" :value="dirIndex" @change="onDir">
            <view class="sp-row">
              <view class="sp-row-left">
                <view class="sp-row-icon" style="background: var(--ail-accent-orange-muted)">
                  <text class="sp-row-icon-t" style="color: var(--ail-accent-orange)">◎</text>
                </view>
                <view class="sp-row-body">
                  <text class="sp-row-label">主方向</text>
                  <text class="sp-row-hint">你的主要学习方向</text>
                </view>
              </view>
              <view class="sp-row-right">
                <text class="sp-row-value">{{ dirLabels[dirIndex] }}</text>
                <text class="sp-row-chevron">›</text>
              </view>
            </view>
          </picker>
        </view>
      </view>

      <!-- ═══════ Learning pace ═══════ -->
      <view class="ail-section">
        <view class="ail-section-hd">
          <text class="ail-section-title">学习节奏</text>
        </view>
        <view class="ail-card sp-card">
          <picker :range="paceLabels" :value="paceIndex" @change="onPace">
            <view class="sp-row">
              <view class="sp-row-left">
                <view class="sp-row-icon" style="background: var(--ail-accent-purple-muted)">
                  <text class="sp-row-icon-t" style="color: var(--ail-accent-purple)">◇</text>
                </view>
                <view class="sp-row-body">
                  <text class="sp-row-label">节奏</text>
                  <text class="sp-row-hint">每周学习强度</text>
                </view>
              </view>
              <view class="sp-row-right">
                <text class="sp-row-value">{{ paceLabels[paceIndex] }}</text>
                <text class="sp-row-chevron">›</text>
              </view>
            </view>
          </picker>
        </view>
      </view>

      <!-- ═══════ Save ═══════ -->
      <view class="ail-section ail-section-last">
        <view class="ail-cta" @click="save">
          <text class="ail-cta-t">保存偏好设置</text>
          <text class="ail-cta-arrow">→</text>
        </view>
        <text class="sp-save-hint">保存后将重新生成你的个性化学习路径</text>
      </view>

    </view>
  </AppShell>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import AppShell from '../../components/AppShell.vue';
import { navigationConfig } from '@ail/config';
import { request } from '../../services/http';

const dirKeys   = ['ai-agent', 'general'] as const;
const dirLabels = ['AI Agent', '通用探索'];
const paceKeys  = ['light', 'normal', 'intensive'] as const;
const paceLabels = ['轻量', '正常', '强化'];

const dirIndex  = ref(0);
const paceIndex = ref(1);

function handleNavigate(key: string) {
  const item = navigationConfig.find((n) => n.key === key);
  if (!item) return;
  if (key === 'settings') return;
  uni.navigateTo({ url: item.path });
}

onMounted(async () => {
  const res = await request<{ preferences: Record<string, string> | null }>('/users/me');
  const p = res.data.preferences || {};
  const d = (p.preferredDirection as string) || 'ai-agent';
  dirIndex.value = Math.max(0, dirKeys.indexOf(d as (typeof dirKeys)[number]));
  if (dirIndex.value < 0) dirIndex.value = 0;
  const pace = (p.pace as string) || 'normal';
  paceIndex.value = Math.max(0, paceKeys.indexOf(pace as (typeof paceKeys)[number]));
  if (paceIndex.value < 0) paceIndex.value = 1;
});

function onDir(e: { detail: { value: string } })  { dirIndex.value  = Number(e.detail.value); }
function onPace(e: { detail: { value: string } }) { paceIndex.value = Number(e.detail.value); }

async function save() {
  try {
    await request('/users/me', {
      method: 'PATCH',
      body: {
        preferences: {
          preferredDirection: dirKeys[dirIndex.value],
          pace: paceKeys[paceIndex.value],
          background: 'frontend-engineer',
          goal: 'skill-upgrade',
        },
      },
    });
    uni.showToast({ title: '已保存', icon: 'success' });
  } catch (e) {
    uni.showToast({ title: (e as Error).message || '失败', icon: 'none' });
  }
}
</script>

<style>
.sp {
  min-height: 100vh;
  background: var(--ail-bg);
}

/* Card uses overflow:hidden for picker */
.sp-card { overflow: hidden; }

/* Setting row */
.sp-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 28rpx;
  cursor: pointer;
}

.sp-row-left {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20rpx;
}

.sp-row-icon {
  width: 60rpx;
  height: 60rpx;
  border-radius: 14rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.sp-row-icon-t {
  font-size: 22rpx;
  font-weight: 700;
  line-height: 1;
}

.sp-row-body {
  display: flex;
  flex-direction: column;
  gap: 5rpx;
}

.sp-row-label {
  font-size: 28rpx;
  font-weight: 600;
  color: var(--ail-text-primary);
  font-family: 'Outfit', 'PingFang SC', sans-serif;
  line-height: 1.2;
}

.sp-row-hint {
  font-size: 22rpx;
  color: var(--ail-text-secondary);
  font-family: 'Outfit', 'PingFang SC', sans-serif;
}

.sp-row-right {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 6rpx;
}

.sp-row-value {
  font-size: 26rpx;
  color: var(--ail-text-secondary);
  font-family: 'Outfit', 'PingFang SC', sans-serif;
  font-weight: 500;
}

.sp-row-chevron {
  font-size: 32rpx;
  color: var(--ail-text-tertiary);
  font-family: 'Outfit', sans-serif;
}

/* Save hint */
.sp-save-hint {
  display: block;
  font-size: 22rpx;
  color: var(--ail-text-tertiary);
  font-family: 'Outfit', 'PingFang SC', sans-serif;
  text-align: center;
  margin-top: 20rpx;
  line-height: 1.5;
}

/* Desktop */
@media screen and (min-width: 768px) {
  .sp-row        { padding: 14px 16px; }
  .sp-row-left   { gap: 12px; }
  .sp-row-icon   { width: 34px; height: 34px; border-radius: 8px; }
  .sp-row-icon-t { font-size: 13px; }
  .sp-row-label  { font-size: 13px; }
  .sp-row-hint   { font-size: 11px; }
  .sp-row-value  { font-size: 12px; }
  .sp-row-chevron { font-size: 16px; }
  .sp-save-hint  { font-size: 11px; margin-top: 12px; }
}
</style>
