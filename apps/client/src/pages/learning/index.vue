<template>
  <AppShell current-page="learning" @navigate="handleNavigate">
    <view class="lp">

      <view v-if="entry">

        <!-- ═══════ Path overview card ═══════ -->
        <view class="ail-section ail-section-first">
          <view class="ail-section-hd">
            <text class="ail-section-title">路径概览</text>
            <view v-if="entry.path.isDefault" class="ail-badge lp-badge-green">
              <text class="ail-badge-t lp-badge-green-t">默认</text>
            </view>
          </view>
          <view class="ail-card lp-info-card">
            <text class="lp-info-title">{{ entry.path.title }}</text>
            <text class="lp-info-summary">{{ entry.path.summary }}</text>
            <view class="lp-chips">
              <view class="ail-chip">
                <view class="ail-chip-dot" style="background: var(--ail-accent-blue)"></view>
                <text class="ail-chip-t">{{ entry.direction }}</text>
              </view>
              <view class="ail-chip">
                <view class="ail-chip-dot" style="background: var(--ail-accent-purple)"></view>
                <text class="ail-chip-t">{{ entry.stages.length }} 阶段</text>
              </view>
              <view class="ail-chip">
                <view class="ail-chip-dot" style="background: var(--ail-primary)"></view>
                <text class="ail-chip-t">{{ totalModules }} 模块</text>
              </view>
            </view>
          </view>
        </view>

        <!-- ═══════ Stages ═══════ -->
        <view class="ail-section ail-section-last">
          <view class="ail-section-hd">
            <text class="ail-section-title">学习阶段</text>
            <view class="ail-badge lp-badge-blue">
              <text class="ail-badge-t lp-badge-blue-t">{{ entry.stages.length }} 个</text>
            </view>
          </view>

          <view
            v-for="(st, si) in entry.stages"
            :key="st.key"
            class="lp-stage"
          >
            <view class="lp-stage-hd">
              <view
                class="lp-stage-num"
                :style="{ background: stageColors[si % stageColors.length] }"
              >
                <text class="lp-stage-num-t">{{ si + 1 }}</text>
              </view>
              <text class="lp-stage-title">{{ st.title }}</text>
              <view class="lp-stage-count">
                <text class="lp-stage-count-t">{{ st.modules.length }}</text>
              </view>
            </view>

            <view
              v-for="m in st.modules"
              :key="m.key"
              class="lp-module"
              :class="{ 'lp-module-hl': (entry.highlight || []).includes(m.key) }"
            >
              <view
                v-if="(entry.highlight || []).includes(m.key)"
                class="lp-module-bar"
                :style="{ background: stageColors[si % stageColors.length] }"
              ></view>
              <text class="lp-module-t">{{ m.title }}</text>
              <view
                v-if="(entry.highlight || []).includes(m.key)"
                class="lp-hl-badge"
                :style="{ background: stageColorsMuted[si % stageColorsMuted.length] }"
              >
                <text
                  class="lp-hl-badge-t"
                  :style="{ color: stageColors[si % stageColors.length] }"
                >重点</text>
              </view>
            </view>
          </view>
        </view>

      </view>

      <!-- Loading -->
      <view v-else class="ail-loading">
        <view class="ail-loading-icon lp-loading-icon-blue">
          <text class="ail-loading-icon-t lp-loading-icon-t-blue">◇</text>
        </view>
        <text class="ail-loading-t">加载学习路径...</text>
      </view>

    </view>
  </AppShell>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import AppShell from '../../components/AppShell.vue';
import { navigationConfig } from '@ail/config';
import { request } from '../../services/http';

type Entry = {
  direction: string;
  path: { key: string; title: string; summary: string; isDefault: boolean };
  stages: { key: string; title: string; modules: { key: string; title: string }[] }[];
  highlight: string[];
};

const entry = ref<Entry | null>(null);

const stageColors      = ['#3DD68C', '#60A5FA', '#A78BFA', '#FF9F43', '#FF6B6B'];
const stageColorsMuted = ['#E8FAF0', '#EFF6FF', '#F3F0FF', '#FFF3E4', '#FFF1F1'];

const totalModules = computed(() =>
  (entry.value?.stages || []).reduce((sum, st) => sum + st.modules.length, 0)
);

function handleNavigate(key: string) {
  const item = navigationConfig.find((n) => n.key === key);
  if (!item) return;
  if (key === 'learning') return;
  uni.navigateTo({ url: item.path });
}

onMounted(async () => {
  try {
    const res = await request<Entry>('/learning/entry');
    entry.value = res.data;
  } catch {
    uni.showToast({ title: '加载失败', icon: 'none' });
  }
});
</script>

<style>
.lp {
  min-height: 100vh;
  background: var(--ail-bg);
}

/* Badge color variants */
.lp-badge-green   { background: var(--ail-primary-muted); }
.lp-badge-green-t { color: var(--ail-primary); }
.lp-badge-blue    { background: var(--ail-accent-blue-muted); }
.lp-badge-blue-t  { color: var(--ail-accent-blue); }

/* Loading icon color override */
.lp-loading-icon-blue    { background: var(--ail-accent-blue-muted); }
.lp-loading-icon-t-blue  { color: var(--ail-accent-blue); }

/* Path info card */
.lp-info-card {
  padding: 32rpx 28rpx;
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

.lp-info-title {
  display: block;
  font-size: 32rpx;
  font-weight: 700;
  color: var(--ail-text-primary);
  font-family: 'Outfit', 'PingFang SC', sans-serif;
  line-height: var(--ail-line-height-tight);
}

.lp-info-summary {
  display: block;
  font-size: 26rpx;
  color: var(--ail-text-secondary);
  font-family: 'Outfit', 'PingFang SC', sans-serif;
  line-height: var(--ail-line-height-loose);
}

.lp-chips {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 12rpx;
  margin-top: 4rpx;
}

/* Stage card */
.lp-stage {
  background: var(--ail-surface);
  border-radius: var(--ail-radius-md);
  box-shadow: var(--ail-shadow-sm);
  overflow: hidden;
  margin-bottom: 28rpx;
}

.lp-stage:last-child { margin-bottom: 0; }

.lp-stage-hd {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 18rpx;
  padding: 24rpx 28rpx;
  border-bottom: 1rpx solid var(--ail-divider);
}

.lp-stage-num {
  width: 48rpx;
  height: 48rpx;
  border-radius: 12rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.lp-stage-num-t {
  font-size: 22rpx;
  color: #fff;
  font-weight: 700;
  font-family: 'Outfit', sans-serif;
  line-height: 1;
}

.lp-stage-title {
  flex: 1;
  font-size: 28rpx;
  font-weight: 600;
  color: var(--ail-text-primary);
  font-family: 'Outfit', 'PingFang SC', sans-serif;
}

.lp-stage-count {
  width: 44rpx;
  height: 44rpx;
  border-radius: 50%;
  background: var(--ail-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.lp-stage-count-t {
  font-size: 20rpx;
  color: var(--ail-text-secondary);
  font-family: 'Outfit', sans-serif;
  font-weight: 600;
}

/* Module item */
.lp-module {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 18rpx;
  padding: 22rpx 28rpx;
  border-bottom: 1rpx solid var(--ail-divider);
  position: relative;
}

.lp-module:last-child { border-bottom: none; }

.lp-module-hl { background: rgba(0, 0, 0, 0.015); }

.lp-module-bar {
  position: absolute;
  left: 0;
  top: 12rpx;
  bottom: 12rpx;
  width: 4rpx;
  border-radius: 0 3rpx 3rpx 0;
}

.lp-module-t {
  flex: 1;
  font-size: 26rpx;
  color: var(--ail-text-primary);
  font-family: 'Outfit', 'PingFang SC', sans-serif;
  line-height: 1.4;
}

.lp-hl-badge {
  border-radius: var(--ail-radius-full);
  padding: 4rpx 14rpx;
  flex-shrink: 0;
}

.lp-hl-badge-t {
  font-size: 19rpx;
  font-weight: 600;
  font-family: 'Outfit', sans-serif;
}

/* Desktop */
@media screen and (min-width: 768px) {
  .lp-info-card  { padding: 18px 16px; border-radius: 12px; gap: 10px; }
  .lp-info-title { font-size: 16px; }
  .lp-info-summary { font-size: 12.5px; line-height: 1.65; }

  .lp-stage      { margin-bottom: 16px; border-radius: 12px; }
  .lp-stage-hd   { padding: 14px 16px; gap: 10px; }
  .lp-stage-num  { width: 26px; height: 26px; border-radius: 7px; }
  .lp-stage-num-t { font-size: 12px; }
  .lp-stage-title { font-size: 13px; }
  .lp-stage-count { width: 24px; height: 24px; }
  .lp-stage-count-t { font-size: 11px; }

  .lp-module     { padding: 12px 16px; gap: 10px; }
  .lp-module-bar { top: 6px; bottom: 6px; width: 2px; }
  .lp-module-t   { font-size: 12.5px; }
  .lp-hl-badge   { padding: 2px 8px; }
  .lp-hl-badge-t { font-size: 10px; }
}
</style>
