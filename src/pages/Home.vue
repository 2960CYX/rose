<script setup>
import { computed } from 'vue';
import { usePostStore } from '../stores/post';
import PostCard from '../components/PostCard.vue';
import PageSection from '../components/PageSection.vue';
import { useRouter } from 'vue-router';

const postStore = usePostStore();

const posts = computed(() => postStore.postList);
const router = useRouter();

const trending = computed(() => {
  return [...posts.value]
    .sort((a, b) => b.likes - a.likes)
    .slice(0, 6);
});

const topAuthors = computed(() => {
  const map = new Map();
  posts.value.forEach((p) => {
    const key = p.authorName || '匿名';
    map.set(key, (map.get(key) || 0) + 1);
  });
  return [...map.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([name, count]) => ({ name, count }));
});
</script>

<template>
  <section class="home-page">
    <header class="hero">
      <h1 class="headline-contrast">链上博客空间</h1>
      <p>发布、分享并保护你的原创内容，让创作与版权透明可信。</p>
      <div class="hero-actions">
        <el-button type="primary" class="button-cta" @click="router.push('/explore')">开始探索</el-button>
      </div>
    </header>
    <div class="page-grid cols-2">
      <PageSection title="最新创作" meta="链上发布的最新内容">
        <div v-if="posts.length" class="post-list">
          <PostCard v-for="post in posts" :key="post.id" :post="post" />
        </div>
        <el-empty v-else description="暂时还没有文章，快去发布第一篇吧！" />
      </PageSection>

      <div>
        <PageSection title="链上热点" meta="近期互动最多的创作">
          <ul class="hot-list">
            <li v-for="p in trending" :key="p.id" @click="router.push({ name: 'PostDetail', params: { id: p.id } })">
              <span class="hot-title">{{ p.title }}</span>
              <span class="hot-meta">{{ p.likes }} 赞 · {{ p.comments.length }} 评论</span>
            </li>
          </ul>
        </PageSection>
        <PageSection title="精选作者" meta="优质创作者">
          <ul class="author-list">
            <li v-for="a in topAuthors" :key="a.name">
              <span class="author-name">{{ a.name }}</span>
              <span class="author-meta">{{ a.count }} 篇</span>
            </li>
          </ul>
        </PageSection>
      </div>
    </div>
  </section>
</template>

<style scoped>
.home-page {
  display: flex;
  flex-direction: column;
  gap: var(--page-gap);
}

.hero h1 {
  margin: 0 0 12px;
  font-size: 32px;
  font-weight: 700;
}

.hero p {
  margin: 0;
  font-size: 16px;
  opacity: 0.85;
}

.hero-actions { margin-top: var(--space-sm); }

.post-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--space-lg);
}

.hot-list, .author-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-sm);
}

.hot-list li, .author-list li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  border-radius: 10px;
  background: linear-gradient(#fff, #fff) padding-box,
    linear-gradient(135deg, var(--gradient-accent-start), var(--gradient-accent-end)) border-box;
  border: 1px solid transparent;
  cursor: pointer;
}

.hot-title { font-weight: 600; }
.hot-meta, .author-meta { color: var(--color-muted); font-size: var(--font-sm); }
.author-name { font-weight: 600; }
</style>
