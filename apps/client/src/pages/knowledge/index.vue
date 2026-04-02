<template>
  <AppShell current-page="knowledge" @navigate="handleNavigate">
    <view class="kn">

      <!-- ═══════ Search ═══════ -->
      <view class="ail-section ail-section-first">
        <view class="kn-search">
          <text class="kn-search-icon">◎</text>
          <input
            v-model="q"
            class="kn-search-input"
            placeholder="搜索标题或摘要..."
            placeholder-style="color: var(--ail-text-tertiary)"
            @confirm="load"
          />
          <view v-if="q" class="kn-search-clear" @click="clearQ">
            <text class="kn-clear-t">×</text>
          </view>
        </view>
      </view>

      <!-- ═══════ List ═══════ -->
      <view class="ail-section ail-section-last">
        <view class="ail-section-hd">
          <text class="ail-section-title">全部记录</text>
          <view class="kn-hd-right">
            <view v-if="items.length" class="ail-badge kn-count-badge">
              <text class="ail-badge-t kn-count-t">{{ items.length }} 条</text>
            </view>
            <view class="kn-new-btn" @click="goNew">
              <text class="kn-new-t">+ 新建</text>
            </view>
          </view>
        </view>

        <view class="ail-list">
          <view
            v-for="(it, idx) in items"
            :key="it.id"
            class="ail-list-item"
            @click="goDetail(it.id)"
          >
            <view
              class="ail-item-accent"
              :style="{ background: knColors[idx % knColors.length] }"
            ></view>
            <view
              class="ail-item-icon"
              :style="{ background: knColorsMuted[idx % knColorsMuted.length] }"
            >
              <text
                class="ail-item-icon-t"
                :style="{ color: knColors[idx % knColors.length] }"
              >{{ knSymbols[idx % knSymbols.length] }}</text>
            </view>
            <view class="ail-item-body">
              <text class="ail-item-name">{{ it.title }}</text>
              <text class="ail-item-hint">{{ it.summary || '暂无摘要' }}</text>
            </view>
            <text class="ail-item-chevron">›</text>
          </view>
        </view>

        <!-- Empty state -->
        <view v-if="!items.length" class="ail-empty">
          <view class="ail-empty-icon">
            <text class="ail-empty-icon-t">◎</text>
          </view>
          <text class="ail-empty-title">暂无知识卡片</text>
          <text class="ail-empty-hint">点击下方 + 创建第一条记录</text>
          <view class="ail-cta-pill" @click="goNew">
            <text class="ail-cta-pill-t">立即创建</text>
            <text class="ail-cta-pill-arrow">→</text>
          </view>
        </view>
      </view>

      <!-- ═══════ FAB (mobile only) ═══════ -->
      <view class="ail-fab" @click="goNew">
        <text class="ail-fab-icon">+</text>
      </view>

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

const knColors      = ['#3DD68C', '#FF9F43', '#A78BFA', '#60A5FA', '#FF6B6B'];
const knColorsMuted = ['#E8FAF0', '#FFF3E4', '#F3F0FF', '#EFF6FF', '#FFF1F1'];
const knSymbols     = ['◈', '◎', '◇', '◻', '◉'];

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

function clearQ() {
  q.value = '';
  load();
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
.kn {
  min-height: 100vh;
  background: var(--ail-bg);
}

/* Search bar */
.kn-search {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16rpx;
  background: var(--ail-surface);
  border-radius: var(--ail-radius-md);
  padding: 22rpx 26rpx;
  box-shadow: var(--ail-shadow-sm);
  border: 1.5rpx solid var(--ail-border);
}

.kn-search-icon {
  font-size: 26rpx;
  color: var(--ail-text-tertiary);
  flex-shrink: 0;
  line-height: 1;
}

.kn-search-input {
  flex: 1;
  font-size: 28rpx;
  color: var(--ail-text-primary);
  font-family: 'Outfit', 'PingFang SC', sans-serif;
  background: transparent;
}

.kn-search-clear {
  width: 40rpx;
  height: 40rpx;
  border-radius: 50%;
  background: var(--ail-border);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  cursor: pointer;
}

.kn-clear-t {
  font-size: 22rpx;
  color: var(--ail-text-secondary);
  line-height: 1;
}

/* Section header right slot */
.kn-hd-right {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 14rpx;
}

.kn-count-badge {
  background: var(--ail-accent-orange-muted);
}

.kn-count-t {
  color: var(--ail-accent-orange);
}

.kn-new-btn {
  padding: 8rpx 20rpx;
  background: var(--ail-primary-muted);
  border-radius: var(--ail-radius-full);
  cursor: pointer;
}

.kn-new-t {
  font-size: 22rpx;
  color: var(--ail-primary);
  font-family: 'Outfit', 'PingFang SC', sans-serif;
  font-weight: 600;
}

/* Desktop */
@media screen and (min-width: 768px) {
  .kn-search { padding: 12px 16px; border-radius: 10px; gap: 10px; }
  .kn-search-icon { font-size: 14px; }
  .kn-search-input { font-size: 13px; }
  .kn-hd-right { gap: 8px; }
  .kn-new-btn { padding: 4px 12px; }
  .kn-new-t { font-size: 11px; }
}
</style>
