<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { CircleCheckFilled, ChatRound } from '@element-plus/icons-vue';

const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
});

const router = useRouter();

const publishedAt = computed(() => {
  return new Date(props.post.createdAt).toLocaleString();
});

const handleView = () => {
  router.push({ name: 'PostDetail', params: { id: props.post.id } });
};
</script>

<template>
  <el-card class="post-card" shadow="hover">
    <div class="header">
      <h3 class="title" @click="handleView">{{ post.title }}</h3>
      <span class="meta">
        作者 {{ post.authorName }} · {{ publishedAt }}
      </span>
    </div>
    <p class="summary">
      {{ post.summary || '这篇文章还没有摘要，点击查看详情~' }}
    </p>
    <div class="footer">
      <el-button type="primary" link @click="handleView">查看详情</el-button>
      <div class="stats">
        <span><el-icon><CircleCheckFilled /></el-icon> {{ post.likes }} 赞</span>
        <span><el-icon><ChatRound /></el-icon> {{ post.comments.length }} 评论</span>
      </div>
    </div>
  </el-card>
</template>

<style scoped>
.post-card {
  margin-bottom: 0;
  border-radius: var(--radius-card);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.post-card:hover {
  transform: translateY(-2px) scale(1.01);
}

.header {
  position: relative;
}

.title {
  font-size: var(--font-lg);
  font-weight: 600;
  color: var(--color-text);
  cursor: pointer;
  margin: 0 0 8px;
}

.title:hover {
  background: linear-gradient(90deg, var(--gradient-accent-start), var(--gradient-accent-end));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.header::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -6px;
  width: 38%;
  height: 2px;
  background: linear-gradient(90deg, var(--gradient-accent-start), var(--gradient-accent-end));
  border-radius: 2px;
  transition: width 0.3s ease, opacity 0.3s ease;
  opacity: 0.8;
}

.post-card:hover .header::after {
  width: 60%;
  opacity: 1;
}

.meta {
  color: var(--color-muted);
  font-size: var(--font-sm);
}

.summary {
  color: var(--color-text);
  line-height: 1.6;
  margin: 12px 0 16px;
}

.footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--color-muted);
  font-size: var(--font-sm);
}

.stats {
  display: flex;
  gap: 12px;
  align-items: center;
}
</style>
