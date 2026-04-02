<template>
  <view class="kd">

    <!-- ═══════ Nav bar ═══════ -->
    <view class="ail-nav-bar">
      <view class="ail-nav-back" @click="goBack">
        <text class="ail-nav-back-icon">‹</text>
        <text class="ail-nav-back-t">返回</text>
      </view>
      <text class="ail-nav-title">知识详情</text>
      <view class="ail-nav-action" @click="goEdit">
        <text class="ail-nav-action-t">编辑</text>
      </view>
    </view>

    <!-- ═══════ Content ═══════ -->
    <view v-if="item">

      <!-- Hero -->
      <view class="kd-hero">
        <view class="kd-hero-icon">
          <text class="kd-hero-icon-t">◈</text>
        </view>
        <text class="kd-title">{{ item.title }}</text>
      </view>

      <!-- Summary -->
      <view v-if="item.summary" class="ail-section">
        <view class="kd-block-hd">
          <view class="kd-dot" style="background: var(--ail-accent-orange)"></view>
          <text class="kd-block-label">摘要</text>
        </view>
        <view class="ail-card kd-text-card">
          <text class="kd-summary-t">{{ item.summary }}</text>
        </view>
      </view>

      <!-- Content -->
      <view class="ail-section">
        <view class="kd-block-hd">
          <view class="kd-dot" style="background: var(--ail-primary)"></view>
          <text class="kd-block-label">正文</text>
        </view>
        <view class="ail-card kd-text-card">
          <text class="kd-content-t">{{ item.content }}</text>
        </view>
      </view>

      <!-- CTA -->
      <view class="ail-section ail-section-last">
        <view class="ail-cta" @click="goEdit">
          <text class="ail-cta-t">编辑此条目</text>
          <text class="ail-cta-arrow">→</text>
        </view>
      </view>

    </view>

    <!-- Loading -->
    <view v-else class="ail-loading">
      <view class="ail-loading-icon">
        <text class="ail-loading-icon-t">◎</text>
      </view>
      <text class="ail-loading-t">加载中...</text>
    </view>

  </view>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';
import { ref } from 'vue';
import { request } from '../../services/http';

const item = ref<{
  id: string;
  title: string;
  summary: string | null;
  content: string;
} | null>(null);
const id = ref('');

onLoad((q) => {
  id.value = q.id || '';
  if (!id.value) return;
  request(`/knowledge/${id.value}`).then((res) => {
    item.value = res.data as typeof item.value;
  });
});

function goBack()  { uni.navigateBack(); }
function goEdit()  { uni.navigateTo({ url: `/pages/knowledge/edit?id=${id.value}` }); }
</script>

<style>
.kd {
  min-height: 100vh;
  background: var(--ail-bg);
}

/* Hero section */
.kd-hero {
  padding: 48rpx 36rpx 36rpx;
  background: var(--ail-surface);
  border-bottom: 1px solid var(--ail-divider);
  display: flex;
  flex-direction: column;
  gap: 24rpx;
}

.kd-hero-icon {
  width: 80rpx;
  height: 80rpx;
  border-radius: 20rpx;
  background: var(--ail-primary-muted);
  display: flex;
  align-items: center;
  justify-content: center;
}

.kd-hero-icon-t {
  font-size: 32rpx;
  color: var(--ail-primary);
  font-weight: 700;
  line-height: 1;
}

.kd-title {
  display: block;
  font-size: 44rpx;
  font-weight: 700;
  color: var(--ail-text-primary);
  font-family: 'Outfit', 'PingFang SC', sans-serif;
  letter-spacing: -0.5rpx;
  line-height: var(--ail-line-height-tight);
}

/* Block header (dot + label) */
.kd-block-hd {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12rpx;
  margin-bottom: 18rpx;
}

.kd-dot {
  width: 8rpx;
  height: 8rpx;
  border-radius: 50%;
  flex-shrink: 0;
}

.kd-block-label {
  font-size: 22rpx;
  font-weight: 700;
  color: var(--ail-text-secondary);
  font-family: 'Outfit', sans-serif;
  text-transform: uppercase;
  letter-spacing: 1rpx;
}

/* Text cards */
.kd-text-card {
  padding: 28rpx;
}

.kd-summary-t {
  display: block;
  font-size: 26rpx;
  color: var(--ail-text-secondary);
  font-family: 'Outfit', 'PingFang SC', sans-serif;
  line-height: var(--ail-line-height-loose);
}

.kd-content-t {
  display: block;
  font-size: 28rpx;
  color: var(--ail-text-primary);
  font-family: 'Outfit', 'PingFang SC', sans-serif;
  line-height: var(--ail-line-height-loose);
  white-space: pre-wrap;
}

/* Desktop */
@media screen and (min-width: 768px) {
  .kd-hero { padding: 32px 28px 24px; gap: 16px; }
  .kd-hero-icon { width: 44px; height: 44px; border-radius: 11px; }
  .kd-hero-icon-t { font-size: 18px; }
  .kd-title { font-size: 26px; }
  .kd-block-hd { margin-bottom: 10px; gap: 8px; }
  .kd-dot { width: 5px; height: 5px; }
  .kd-block-label { font-size: 11px; }
  .kd-text-card { padding: 16px; border-radius: 12px; }
  .kd-summary-t { font-size: 13px; line-height: 1.65; }
  .kd-content-t { font-size: 14px; line-height: 1.75; }
}
</style>
