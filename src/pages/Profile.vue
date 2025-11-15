<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { DocumentCopy } from '@element-plus/icons-vue';
import { useUserStore } from '../stores/user';
import { usePostStore } from '../stores/post';
import PageSection from '../components/PageSection.vue';

const router = useRouter();
const userStore = useUserStore();
const postStore = usePostStore();

const user = computed(() => userStore.currentUser);
const posts = computed(() =>
  user.value ? postStore.postsByAuthor(user.value.id) : []
);

const copyAddress = async () => {
  if (!user.value?.walletAddress) return;
  try {
    await navigator.clipboard.writeText(user.value.walletAddress);
    ElMessage.success('钱包地址已复制');
  } catch (error) {
    ElMessage.error('复制失败，请手动复制');
  }
};
</script>

<template>
  <section class="profile-page">
    <div class="page-grid cols-2">
      <PageSection title="个人中心">
        <template #actions>
          <el-button type="warning" link @click="userStore.logout(); router.push('/')">退出登录</el-button>
        </template>
        <template v-if="user">
          <el-descriptions :column="1">
            <el-descriptions-item label="用户名">
              {{ user.username }}
            </el-descriptions-item>
            <el-descriptions-item label="钱包地址">
              <div class="wallet">
                <code>{{ user.walletAddress }}</code>
                <el-button text type="primary" @click="copyAddress">
                  <el-icon><DocumentCopy /></el-icon> 复制
                </el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="注册时间">
              {{ new Date(user.createdAt).toLocaleString() }}
            </el-descriptions-item>
          </el-descriptions>
        </template>
        <el-empty v-else description="用户信息不存在，请重新登录" />
      </PageSection>

      <PageSection :title="`我发布的文章 (${posts.length})`">
        <template #actions>
          <el-button type="primary" @click="router.push('/create')">写新文章</el-button>
        </template>
        <el-empty v-if="!posts.length" description="还没有发布文章，快去创作吧！" />
        <el-timeline v-else>
          <el-timeline-item
            v-for="post in posts"
            :key="post.id"
            :timestamp="new Date(post.createdAt).toLocaleString()"
          >
            <div class="post-item">
              <span class="post-title" @click="router.push({ name: 'PostDetail', params: { id: post.id } })">
                {{ post.title }}
              </span>
              <div class="post-meta">
                点赞 {{ post.likes }} · 评论 {{ post.comments.length }}
              </div>
            </div>
          </el-timeline-item>
        </el-timeline>
      </PageSection>
    </div>
  </section>
</template>

<style scoped>
.profile-page {
  display: block;
}

.profile-card {
  border-radius: var(--radius-card);
}



.wallet {
  display: flex;
  align-items: center;
  gap: 12px;
}

.wallet code {
  background: var(--color-bg-soft);
  padding: 4px 8px;
  border-radius: 6px;
  font-size: var(--font-sm);
}

.post-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.post-title {
  font-weight: 600;
  cursor: pointer;
}

.post-title:hover {
  color: var(--color-primary);
}

.post-meta {
  color: var(--color-muted);
  font-size: var(--font-sm);
}
</style>
