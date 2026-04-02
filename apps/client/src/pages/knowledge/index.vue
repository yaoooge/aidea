<template>
  <AppShell current-page="knowledge" @navigate="handleNavigate">
    <view class="page">
      <view class="toolbar">
        <input v-model="q" class="search" placeholder="搜索标题/摘要" @confirm="load" />
        <button size="mini" type="primary" @click="load">搜索</button>
        <button size="mini" @click="goNew">新建</button>
      </view>
      <view v-for="it in items" :key="it.id" class="card" @click="goDetail(it.id)">
        <text class="card-t">{{ it.title }}</text>
        <text class="card-s">{{ it.summary || '无摘要' }}</text>
      </view>
      <text v-if="!items.length" class="empty">暂无数据</text>
    </view>
  </AppShell>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import AppShell from '../../components/AppShell.vue';
import { navigationConfig } from '@ail/config';
import { request } from '../../services/http';

const items = ref<{ id: string; title: string; summary: string | null }[]>([]);
const q = ref('');

function handleNavigate(key: string) {
  const item = navigationConfig.find((n) => n.key === key);
  if (!item) return;
  if (key === 'knowledge') return;
  uni.navigateTo({ url: item.path });
}

async function load() {
  const query = q.value ? `?q=${encodeURIComponent(q.value)}` : '';
  const res = await request<{
    items: { id: string; title: string; summary: string | null }[];
  }>(`/knowledge${query}`);
  items.value = res.data.items;
}

function goNew() {
  uni.navigateTo({ url: '/pages/knowledge/edit' });
}

function goDetail(id: string) {
  uni.navigateTo({ url: `/pages/knowledge/detail?id=${id}` });
}

onMounted(() => load());
</script>

<style>
.page {
  padding: 24rpx;
}
.toolbar {
  display: flex;
  gap: 12rpx;
  margin-bottom: 20rpx;
  flex-wrap: wrap;
  align-items: center;
}
.search {
  flex: 1;
  min-width: 200rpx;
  background: #151a2e;
  border-radius: 10rpx;
  padding: 16rpx;
  color: #fff;
  font-size: 26rpx;
}
.card {
  background: #151a2e;
  border-radius: 12rpx;
  padding: 20rpx;
  margin-bottom: 16rpx;
}
.card-t {
  font-size: 30rpx;
  font-weight: 600;
  color: #e8ecf4;
  display: block;
}
.card-s {
  font-size: 24rpx;
  color: #8892a6;
  margin-top: 8rpx;
  display: block;
}
.empty {
  color: #6b7280;
  font-size: 26rpx;
}
</style>
