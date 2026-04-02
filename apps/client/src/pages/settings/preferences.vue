<template>
  <AppShell current-page="settings" @navigate="handleNavigate">
    <view class="page">
      <text class="h1">学习偏好</text>
      <text class="hint">整表保存（与 PATCH /users/me 一致）</text>
      <picker :range="dirLabels" :value="dirIndex" @change="onDir">
        <view class="row">
          <text>主方向</text>
          <text>{{ dirLabels[dirIndex] }}</text>
        </view>
      </picker>
      <picker :range="paceLabels" :value="paceIndex" @change="onPace">
        <view class="row">
          <text>节奏</text>
          <text>{{ paceLabels[paceIndex] }}</text>
        </view>
      </picker>
      <button type="primary" @click="save">保存偏好</button>
    </view>
  </AppShell>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import AppShell from '../../components/AppShell.vue';
import { navigationConfig } from '@ail/config';
import { request } from '../../services/http';

const dirKeys = ['ai-agent', 'general'] as const;
const dirLabels = ['AI Agent', '通用探索'];
const paceKeys = ['light', 'normal', 'intensive'] as const;
const paceLabels = ['轻量', '正常', '强化'];

const dirIndex = ref(0);
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

function onDir(e: { detail: { value: string } }) {
  dirIndex.value = Number(e.detail.value);
}

function onPace(e: { detail: { value: string } }) {
  paceIndex.value = Number(e.detail.value);
}

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
.page {
  padding: 32rpx;
  color: #e8ecf4;
}
.h1 {
  font-size: 36rpx;
  font-weight: 700;
  display: block;
}
.hint {
  font-size: 24rpx;
  color: #8892a6;
  margin: 12rpx 0 32rpx;
  display: block;
}
.row {
  display: flex;
  justify-content: space-between;
  padding: 24rpx;
  background: #151a2e;
  border-radius: 12rpx;
  margin-bottom: 16rpx;
  font-size: 28rpx;
}
</style>
