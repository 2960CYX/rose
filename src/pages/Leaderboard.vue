<script setup>
import { computed } from 'vue';
import { usePostStore } from '../stores/post';

const postStore = usePostStore();

const authorStats = computed(() => {
  const statsMap = new Map();
  const posts = postStore.postList || [];
  for (const p of posts) {
    const key = p.authorId ?? p.authorName ?? 'unknown';
    const name = p.authorName || '未知作者';
    const current = statsMap.get(key) || {
      authorId: p.authorId,
      authorName: name,
      posts: 0,
      likes: 0,
      comments: 0,
    };
    current.posts += 1;
    current.likes += Number(p.likes || 0);
    current.comments += Array.isArray(p.comments) ? p.comments.length : 0;
    statsMap.set(key, current);
  }
  return Array.from(statsMap.values()).sort((a, b) => b.likes - a.likes);
});
</script>

<template>
  <section class="leaderboard-page">
    <header class="hero">
      <h2>作者榜单</h2>
      <p>按点赞数量排序，综合展示作者创作与互动表现。</p>
    </header>

    <el-card class="board-card" shadow="hover">
      <template #header>
        <div class="card-header">
          <h3>排行榜</h3>
          <span class="meta">点赞为主要排序指标</span>
        </div>
      </template>
      <el-empty v-if="!authorStats.length" description="暂无数据" />
      <el-table v-else :data="authorStats" stripe>
        <el-table-column type="index" label="#" width="60" />
        <el-table-column prop="authorName" label="作者" min-width="160" />
        <el-table-column prop="posts" label="文章数" width="100" />
        <el-table-column prop="likes" label="总点赞" width="100" />
        <el-table-column prop="comments" label="总评论" width="100" />
      </el-table>
    </el-card>
  </section>
</template>

<style scoped>
.leaderboard-page {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.meta {
  color: #909399;
  font-size: 13px;
}
</style>