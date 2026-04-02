<template>
  <view class="page">
    <view class="field">
      <text class="label">标题</text>
      <input v-model="title" class="input" />
    </view>
    <view class="field">
      <text class="label">摘要</text>
      <input v-model="summary" class="input" />
    </view>
    <view class="field">
      <text class="label">正文</text>
      <textarea v-model="content" class="textarea" />
    </view>
    <button type="primary" @click="save">保存</button>
  </view>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';
import { ref } from 'vue';
import { request } from '../../services/http';

const id = ref('');
const title = ref('');
const summary = ref('');
const content = ref('');

onLoad((q) => {
  id.value = q.id || '';
  if (id.value) {
    request(`/knowledge/${id.value}`).then((res) => {
      const d = res.data as {
        title: string;
        summary: string | null;
        content: string;
      };
      title.value = d.title;
      summary.value = d.summary || '';
      content.value = d.content;
    });
  }
});

async function save() {
  try {
    if (id.value) {
      await request(`/knowledge/${id.value}`, {
        method: 'PATCH',
        body: {
          title: title.value,
          summary: summary.value || null,
          content: content.value,
        },
      });
    } else {
      await request('/knowledge', {
        method: 'POST',
        body: {
          title: title.value,
          summary: summary.value || undefined,
          content: content.value,
          sourceType: 'web',
          contentType: 'article',
          difficulty: 'intro',
        },
      });
    }
    uni.showToast({ title: '已保存', icon: 'success' });
    setTimeout(() => uni.navigateBack(), 500);
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
.field {
  margin-bottom: 24rpx;
}
.label {
  font-size: 24rpx;
  color: #a8b0c4;
  display: block;
  margin-bottom: 8rpx;
}
.input,
.textarea {
  width: 100%;
  background: #151a2e;
  border-radius: 12rpx;
  padding: 20rpx;
  color: #fff;
  font-size: 28rpx;
  box-sizing: border-box;
}
.textarea {
  min-height: 200rpx;
}
</style>
