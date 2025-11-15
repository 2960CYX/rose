<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
const goHome = () => router.push('/');
</script>

<template>
  <section class="notfound-page">
    <el-card class="notfound-card" shadow="never">
      <el-empty description="页面不存在或已被移除">
        <el-button type="primary" @click="goHome">返回首页</el-button>
      </el-empty>
    </el-card>
  </section>
</template>

<style scoped>
.notfound-card {
  border-radius: var(--radius-card);
}
</style>