<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();

const tags = [
  '区块链', '版权', '写作', '设计系统', '前端工程', 'Vue3', 'Pinia', 'ElementPlus', 'Ethers', '实践', '教程', '示例'
];

const goSearch = (tag) => {
  router.push({ path: '/search', query: { q: tag } });
};
</script>

<template>
  <section class="tags-page">
    <header class="hero">
      <h2>标签</h2>
      <p>通过标签快速浏览你感兴趣的主题。</p>
    </header>

    <el-card class="tags-card" shadow="hover">
      <template #header>
        <div class="card-header">
          <h3>常用标签</h3>
          <span class="meta">点击标签可跳转搜索</span>
        </div>
      </template>
      <div class="chip-list">
        <el-tag
          v-for="t in tags"
          :key="t"
          size="large"
          class="chip"
          @click="goSearch(t)"
        >{{ t }}</el-tag>
      </div>
    </el-card>
  </section>
  
</template>

<style scoped>
.tags-page {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.tags-card {
  border-radius: var(--radius-card);
}

.chip-list {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.chip {
  cursor: pointer;
}

.chip:hover {
  filter: brightness(0.95);
}
</style>