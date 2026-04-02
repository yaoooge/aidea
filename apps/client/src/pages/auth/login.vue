<template>
  <view class="login">
    <text class="login-title">鉴权预留</text>
    <text class="login-sub">
      当前版本不校验登录；后端所有业务请求默认视为用户 admin。此处保留页面，便于后续接回登录流程。
    </text>
    <button class="btn" type="primary" @click="goHome">进入应用</button>
    <button class="btn-secondary" :loading="loading" @click="tryLoginApi">测试 POST /auth/login</button>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { request } from '../../services/http';

const loading = ref(false);

function goHome() {
  uni.reLaunch({ url: '/pages/index/index' });
}

async function tryLoginApi() {
  loading.value = true;
  try {
    const res = await request<{ accessToken: string }>('/auth/login', {
      method: 'POST',
      body: { username: 'admin', password: '123456' },
    });
    uni.showToast({
      title: res.data.accessToken ? '接口正常（token 未用于鉴权）' : '无 token',
      icon: 'none',
      duration: 2500,
    });
  } catch (e) {
    uni.showToast({ title: (e as Error).message || '请求失败', icon: 'none' });
  } finally {
    loading.value = false;
  }
}
</script>

<style>
.login {
  min-height: 100vh;
  padding: 48rpx;
  background: var(--ail-bg, #0b0f1c);
  display: flex;
  flex-direction: column;
  gap: 24rpx;
}
.login-title {
  font-size: 44rpx;
  font-weight: 700;
  color: #fff;
}
.login-sub {
  font-size: 26rpx;
  color: #8892a6;
  line-height: 1.5;
  margin-bottom: 24rpx;
}
.btn {
  margin-top: 16rpx;
}
.btn-secondary {
  margin-top: 16rpx;
  background: #151a2e;
  color: #a8b0c4;
}
</style>
