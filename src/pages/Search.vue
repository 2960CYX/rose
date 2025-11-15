<script setup>
import { ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { usePostStore } from '../stores/post';
import PostCard from '../components/PostCard.vue';
import PageSection from '../components/PageSection.vue';
import { searchPosts } from '../services/subgraph';

const postStore = usePostStore();
const route = useRoute();
const query = ref(route.query?.q?.toString() || '');

watch(
  () => route.query.q,
  (q) => {
    query.value = q?.toString() || '';
  }
);

const loading = ref(false);
const remoteResults = ref([]);
const localPosts = computed(() => postStore.postList);
const results = computed(() => {
  const q = query.value.trim();
  if (!q) return [];
  return remoteResults.value.length ? remoteResults.value : localPosts.value.filter((p) => {
    const s = q.toLowerCase();
    return (
      p.title.toLowerCase().includes(s) ||
      (p.summary || '').toLowerCase().includes(s) ||
      (p.content || '').toLowerCase().includes(s) ||
      (p.authorName || '').toLowerCase().includes(s)
    );
  });
});

const doSearch = async () => {
  const q = query.value.trim();
  if (!q) {
    remoteResults.value = [];
    return;
  }
  loading.value = true;
  try {
    const data = await searchPosts(q, 80);
    remoteResults.value = Array.isArray(data) ? data : [];
  } catch {
    remoteResults.value = [];
  } finally {
    loading.value = false;
  }
};

watch(
  () => query.value,
  () => {
    doSearch();
  }
);
</script>

<template>
  <section class="search-page">
    <PageSection title="站内搜索" meta="支持标题、内容、作者名">
      <div class="search-bar">
        <el-input
          v-model="query"
          clearable
          size="large"
          placeholder="输入关键词，例如：区块链、版权、Vue3..."
        />
      </div>
      <el-skeleton v-if="loading" :rows="4" animated />
      <el-empty v-if="query && !results.length" description="没有匹配的结果" />
      <div v-else-if="results.length" class="post-list">
        <PostCard v-for="post in results" :key="post.id" :post="post" />
      </div>
      <el-alert v-else type="info" :closable="false" title="请输入关键词进行搜索" />
    </PageSection>
  </section>
</template>

<style scoped>
.search-page {
  display: flex;
  flex-direction: column;
  gap: var(--page-gap);
}

.search-bar {
  margin-bottom: var(--space-md);
}

.post-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--space-lg);
}
</style>
