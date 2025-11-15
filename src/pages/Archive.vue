<script setup>
import { computed } from 'vue';
import PostCard from '../components/PostCard.vue';
import { usePostStore } from '../stores/post';

const postStore = usePostStore();

const groups = computed(() => {
  const map = new Map();
  const posts = postStore.postList || [];
  for (const p of posts) {
    const d = new Date(p.createdAt);
    const ym = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    const arr = map.get(ym) || [];
    arr.push(p);
    map.set(ym, arr);
  }
  return Array.from(map.entries())
    .sort((a, b) => (a[0] < b[0] ? 1 : -1))
    .map(([key, items]) => {
      const [year, month] = key.split('-');
      return {
        key,
        label: `${year}年${month}月`,
        items,
      };
    });
});
</script>

<template>
  <section class="archive-page">
    <header class="hero">
      <h2>归档</h2>
      <p>按月份浏览已发布的文章，快速定位历史内容。</p>
    </header>
    <el-empty v-if="!groups.length" description="暂无归档内容" />
    <el-card v-for="group in groups" :key="group.key" class="group-card" shadow="hover">
      <template #header>
        <div class="card-header">
          <h3>{{ group.label }}</h3>
          <span class="meta">共 {{ group.items.length }} 篇</span>
        </div>
      </template>
      <div class="post-list">
        <PostCard v-for="post in group.items" :key="post.id" :post="post" />
      </div>
    </el-card>
  </section>
</template>

<style scoped>
.archive-page {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.group-card {
  border-radius: var(--radius-card);
}

.post-list {
  display: flex;
  flex-direction: column;
}
</style>