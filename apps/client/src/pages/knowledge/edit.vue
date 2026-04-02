<template>
  <view class="ke">

    <!-- ═══════ Nav bar ═══════ -->
    <view class="ail-nav-bar">
      <view class="ail-nav-back" @click="goBack">
        <text class="ail-nav-back-icon">‹</text>
        <text class="ail-nav-back-t">返回</text>
      </view>
      <text class="ail-nav-title">{{ id ? '编辑知识' : '新建知识' }}</text>
      <view class="ail-nav-action" @click="save">
        <text class="ail-nav-action-t">保存</text>
      </view>
    </view>

    <!-- ═══════ Form ═══════ -->
    <view class="ail-section ail-section-first">
      <text class="ke-group-label">基本信息</text>
      <view class="ail-card ke-card">

        <view class="ke-field">
          <view class="ke-field-hd">
            <view class="ke-dot" style="background: var(--ail-primary)"></view>
            <text class="ke-field-label">标题</text>
            <text class="ke-required">*</text>
          </view>
          <input
            v-model="title"
            class="ke-input"
            placeholder="为这条知识起个好名字..."
            placeholder-style="color: var(--ail-text-tertiary)"
          />
        </view>

        <view class="ke-divider"></view>

        <view class="ke-field">
          <view class="ke-field-hd">
            <view class="ke-dot" style="background: var(--ail-accent-orange)"></view>
            <text class="ke-field-label">摘要</text>
            <view class="ke-optional"><text class="ke-optional-t">可选</text></view>
          </view>
          <input
            v-model="summary"
            class="ke-input"
            placeholder="用一两句话概括..."
            placeholder-style="color: var(--ail-text-tertiary)"
          />
        </view>

      </view>
    </view>

    <view class="ail-section">
      <text class="ke-group-label">正文内容</text>
      <view class="ail-card ke-card">
        <view class="ke-field">
          <view class="ke-field-hd">
            <view class="ke-dot" style="background: var(--ail-accent-purple)"></view>
            <text class="ke-field-label">正文</text>
          </view>
          <textarea
            v-model="content"
            class="ke-textarea"
            placeholder="在这里记录你的知识..."
            placeholder-style="color: var(--ail-text-tertiary)"
          />
        </view>
      </view>
    </view>

    <view class="ail-section ail-section-last">
      <view class="ail-cta" @click="save">
        <text class="ail-cta-t">{{ id ? '保存修改' : '创建知识卡片' }}</text>
        <text class="ail-cta-arrow">→</text>
      </view>
    </view>

  </view>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';
import { ref } from 'vue';
import { request } from '../../services/http';

const id      = ref('');
const title   = ref('');
const summary = ref('');
const content = ref('');

onLoad((q) => {
  id.value = q.id || '';
  if (id.value) {
    request(`/knowledge/${id.value}`).then((res) => {
      const d = res.data as { title: string; summary: string | null; content: string };
      title.value   = d.title;
      summary.value = d.summary || '';
      content.value = d.content;
    });
  }
});

function goBack() { uni.navigateBack(); }

async function save() {
  try {
    if (id.value) {
      await request(`/knowledge/${id.value}`, {
        method: 'PATCH',
        body: { title: title.value, summary: summary.value || null, content: content.value },
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
.ke {
  min-height: 100vh;
  background: var(--ail-bg);
}

/* Group label */
.ke-group-label {
  display: block;
  font-size: 22rpx;
  font-weight: 700;
  color: var(--ail-text-secondary);
  font-family: 'Outfit', sans-serif;
  text-transform: uppercase;
  letter-spacing: 1.5rpx;
  margin-bottom: 16rpx;
}

/* Card padding override for form */
.ke-card {
  overflow: hidden;
}

/* Field */
.ke-field {
  padding: 28rpx 28rpx 24rpx;
}

.ke-field-hd {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10rpx;
  margin-bottom: 16rpx;
}

.ke-dot {
  width: 8rpx;
  height: 8rpx;
  border-radius: 50%;
  flex-shrink: 0;
}

.ke-field-label {
  flex: 1;
  font-size: 22rpx;
  font-weight: 600;
  color: var(--ail-text-secondary);
  font-family: 'Outfit', sans-serif;
  text-transform: uppercase;
  letter-spacing: 1rpx;
}

.ke-required {
  font-size: 22rpx;
  color: var(--ail-accent-red);
  font-weight: 600;
  font-family: 'Outfit', sans-serif;
}

.ke-optional {
  background: var(--ail-bg);
  border-radius: var(--ail-radius-full);
  padding: 3rpx 12rpx;
}

.ke-optional-t {
  font-size: 20rpx;
  color: var(--ail-text-tertiary);
  font-family: 'Outfit', sans-serif;
}

.ke-divider {
  height: 1rpx;
  background: var(--ail-divider);
  margin: 0 28rpx;
}

/* Inputs */
.ke-input {
  width: 100%;
  font-size: 30rpx;
  color: var(--ail-text-primary);
  font-family: 'Outfit', 'PingFang SC', sans-serif;
  font-weight: 500;
  background: transparent;
  line-height: 1.4;
}

.ke-textarea {
  width: 100%;
  min-height: 280rpx;
  font-size: 28rpx;
  color: var(--ail-text-primary);
  font-family: 'Outfit', 'PingFang SC', sans-serif;
  line-height: var(--ail-line-height-loose);
  background: transparent;
  box-sizing: border-box;
}

/* Desktop */
@media screen and (min-width: 768px) {
  .ke-group-label { font-size: 11px; margin-bottom: 10px; }
  .ke-field { padding: 16px 16px 14px; }
  .ke-field-hd { margin-bottom: 10px; gap: 6px; }
  .ke-dot { width: 5px; height: 5px; }
  .ke-field-label { font-size: 11px; }
  .ke-required { font-size: 11px; }
  .ke-divider { margin: 0 16px; }
  .ke-input { font-size: 14px; }
  .ke-textarea { font-size: 13px; min-height: 160px; line-height: 1.75; }
}
</style>
