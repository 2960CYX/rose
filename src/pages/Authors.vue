<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { usePostStore } from '../stores/post';

const router = useRouter();
const postStore = usePostStore();

const authorStats = computed(() => {
  const stats = new Map();
  const posts = postStore.postList || [];
  for (const p of posts) {
    const key = p.authorId ?? p.authorName ?? 'unknown';
    const name = p.authorName || '未知作者';
    const s = stats.get(key) || { authorId: p.authorId, authorName: name, posts: 0, likes: 0, comments: 0 };
    s.posts += 1;
    s.likes += Number(p.likes || 0);
    s.comments += Array.isArray(p.comments) ? p.comments.length : 0;
    stats.set(key, s);
  }
  return Array.from(stats.values()).sort((a, b) => b.posts - a.posts);
});

const viewAuthorPosts = (name) => {
  router.push({ path: '/search', query: { q: name } });
};
</script>

<template>
  <section class="authors-page">
    <header class="hero">
      <h2>作者目录</h2>
      <p>查看活跃作者的创作表现，并快速检索其文章。</p>
    </header>

    <el-empty v-if="!authorStats.length" description="暂无作者数据" />
    <el-table v-else :data="authorStats" stripe>
      <el-table-column type="index" label="#" width="60" />
      <el-table-column prop="authorName" label="作者" min-width="160" />
      <el-table-column prop="posts" label="文章数" width="100" />
      <el-table-column prop="likes" label="总点赞" width="100" />
      <el-table-column prop="comments" label="总评论" width="100" />
      <el-table-column label="操作" width="160">
        <template #default="scope">
          <el-button type="primary" link @click="viewAuthorPosts(scope.row.authorName)">检索TA的文章</el-button>
        </template>
      </el-table-column>
    </el-table>
  </section>
</template>

<style scoped>
.authors-page {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
</style>