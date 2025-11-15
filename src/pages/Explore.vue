<script setup>
import { computed, ref, onMounted } from 'vue';
import { usePostStore } from '../stores/post';
import PostCard from '../components/PostCard.vue';
import PageSection from '../components/PageSection.vue';
import { getLatestPosts } from '../services/subgraph';

const postStore = usePostStore();

const allPosts = computed(() => postStore.postList);
const trendingPosts = computed(() => {
  return [...allPosts.value].sort((a, b) => b.likes - a.likes).slice(0, 8);
});
const latestRemote = ref([]);
const latestLoading = ref(false);
onMounted(async () => {
  latestLoading.value = true;
  try {
    const data = await getLatestPosts(12);
    latestRemote.value = Array.isArray(data) ? data : [];
  } catch {
    latestRemote.value = [];
  } finally {
    latestLoading.value = false;
  }
});
</script>

<template>
  <section class="explore-page">
    <header class="hero">
      <h2>探索</h2>
      <p>发现站内热门与最新的链上创作。</p>
    </header>

    <div class="page-grid cols-2">
      <PageSection title="热门文章" meta="按点赞数排序">
        <el-empty v-if="!trendingPosts.length" description="暂无内容" />
        <div v-else class="post-list">
          <PostCard v-for="post in trendingPosts" :key="post.id" :post="post" />
        </div>
      </PageSection>

      <PageSection title="最新发布（子图）" meta="按链上时间倒序">
        <el-skeleton v-if="latestLoading" :rows="4" animated />
        <el-empty v-else-if="!latestRemote.length" description="暂无内容" />
        <div v-else class="post-list">
          <PostCard v-for="post in latestRemote" :key="post.id" :post="post" />
        </div>
      </PageSection>
    </div>
  </section>
  
</template>

<style scoped>
.explore-page {
  display: flex;
  flex-direction: column;
  gap: var(--page-gap);
}

.hero h2 {
  margin: 0 0 8px;
}



.post-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--space-lg);
}
</style>
