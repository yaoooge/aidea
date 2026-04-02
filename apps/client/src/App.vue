<script setup lang="ts">
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app';

onLaunch(() => {
  console.log('App Launch');
});
onShow(() => {
  console.log('App Show');
});
onHide(() => {
  console.log('App Hide');
});
</script>

<style>
/* Google Fonts — Outfit */
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap');
</style>

<style lang="scss">
/* 全局注入设计 Token（CSS 自定义属性） */
@import './styles/theme.scss';

/* 全局基础重置 */
page {
  background-color: var(--ail-bg);
  color: var(--ail-text-primary);
  font-size: var(--ail-font-md);
  line-height: var(--ail-line-height-normal);
  -webkit-font-smoothing: antialiased;
  font-family: 'Outfit', 'PingFang SC', 'Helvetica Neue', sans-serif;
}
</style>
