<template>
  <AppShell current-page="learning" @navigate="handleNavigate">
    <view class="page">
      <text class="h1">{{ entry?.path.title || '学习路径' }}</text>
      <text class="desc">{{ entry?.path.summary }}</text>
      <text class="meta">方向：{{ entry?.direction }} · 默认路径：{{ entry?.path.isDefault ? '是' : '否' }}</text>
      <view v-for="st in entry?.stages || []" :key="st.key" class="stage">
        <text class="stage-title">{{ st.title }}</text>
        <view
          v-for="m in st.modules"
          :key="m.key"
          class="mod"
          :class="{ hl: (entry?.highlight || []).includes(m.key) }"
        >
          <text class="mod-t">{{ m.title }}</text>
          <text v-if="(entry?.highlight || []).includes(m.key)" class="mod-badge">重点</text>
        </view>
      </view>
    </view>
  </AppShell>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
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
.page {
  padding: 32rpx;
  color: #e8ecf4;
}
.h1 {
  font-size: 40rpx;
  font-weight: 700;
  display: block;
  margin-bottom: 12rpx;
}
.desc {
  font-size: 26rpx;
  color: #a8b0c4;
  display: block;
  margin-bottom: 8rpx;
}
.meta {
  font-size: 22rpx;
  color: #6b7280;
  display: block;
  margin-bottom: 32rpx;
}
.stage {
  margin-bottom: 28rpx;
}
.stage-title {
  font-size: 30rpx;
  font-weight: 600;
  display: block;
  margin-bottom: 12rpx;
  color: #7dd3fc;
}
.mod {
  padding: 16rpx 20rpx;
  background: #151a2e;
  border-radius: 12rpx;
  margin-bottom: 10rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.mod.hl {
  border: 1px solid #3b82f6;
}
.mod-t {
  font-size: 26rpx;
}
.mod-badge {
  font-size: 20rpx;
  color: #60a5fa;
}
</style>
