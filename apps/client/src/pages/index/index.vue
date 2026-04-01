<template>
  <view class="page">
    <text class="headline">导航（来自 @ail/config）</text>
    <view v-for="item in navigationConfig" :key="item.key" class="nav-row">
      <text class="nav-title">{{ item.title }}</text>
      <text class="nav-path">{{ item.path }}</text>
    </view>
    <text class="subhead">Dashboard 卡片（enabled）</text>
    <view v-for="card in enabledCards" :key="card.key" class="card-row">
      <text>{{ card.title }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { navigationConfig, dashboardCardConfig } from '@ail/config';

const enabledCards = computed(() => dashboardCardConfig.filter((c) => c.enabled));
</script>

<style>
.page {
  padding: 24rpx;
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}
.headline {
  font-size: 32rpx;
  font-weight: 600;
  margin-bottom: 8rpx;
}
.subhead {
  font-size: 28rpx;
  font-weight: 600;
  margin-top: 24rpx;
}
.nav-row {
  padding: 16rpx;
  background: #f0f4ff;
  border-radius: 12rpx;
  display: flex;
  flex-direction: column;
  gap: 8rpx;
}
.nav-title {
  font-size: 30rpx;
  color: #1a1a1a;
}
.nav-path {
  font-size: 24rpx;
  color: #666;
}
.card-row {
  padding: 12rpx 16rpx;
  background: #f6f6f6;
  border-radius: 8rpx;
  font-size: 26rpx;
}
</style>
