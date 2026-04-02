<template>
  <view class="page">
    <text class="title">{{ item?.title }}</text>
    <text class="meta">{{ item?.summary }}</text>
    <text class="content">{{ item?.content }}</text>
    <button type="primary" @click="goEdit">编辑</button>
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

function goEdit() {
  uni.navigateTo({ url: `/pages/knowledge/edit?id=${id.value}` });
}
</script>

<style>
.page {
  padding: 32rpx;
  color: #e8ecf4;
}
.title {
  font-size: 36rpx;
  font-weight: 700;
  display: block;
}
.meta {
  font-size: 26rpx;
  color: #8892a6;
  margin: 16rpx 0;
  display: block;
}
.content {
  font-size: 28rpx;
  white-space: pre-wrap;
  margin-bottom: 32rpx;
  display: block;
}
</style>
