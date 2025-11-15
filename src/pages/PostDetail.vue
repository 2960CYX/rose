<script setup>
import { computed, reactive, ref, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { ArrowLeft, Pointer, Timer } from '@element-plus/icons-vue';
import { usePostStore } from '../stores/post';
import { useUserStore } from '../stores/user';

const route = useRoute();
const router = useRouter();
const postStore = usePostStore();
const userStore = useUserStore();

const post = computed(() => postStore.findById(route.params.id));
const likeLoading = ref(false);
const commentForm = reactive({
  content: '',
});

watchEffect(() => {
  if (!post.value) {
    ElMessage.error('文章不存在或已被删除');
    router.replace('/');
  }
});

const handleLike = async () => {
  if (!post.value) return;
  likeLoading.value = true;
  try {
    postStore.likePost(post.value.id);
    ElMessage.success('感谢点赞!');
  } catch (error) {
    ElMessage.error(error.message || '点赞失败');
  } finally {
    likeLoading.value = false;
  }
};

const handleComment = () => {
  if (!post.value) return;
  if (!commentForm.content.trim()) {
    ElMessage.warning('请输入评论内容');
    return;
  }
  try {
    postStore.addComment(post.value.id, {
      author: userStore.currentUser?.username || '访客',
      content: commentForm.content.trim(),
    });
    commentForm.content = '';
    ElMessage.success('评论已提交');
  } catch (error) {
    ElMessage.error(error.message || '评论提交失败');
  }
};
</script>

<template>
  <section v-if="post" class="detail-page">
    <div class="back" @click="router.back()">
      <el-icon><ArrowLeft /></el-icon>
      返回
    </div>
    <header class="header">
      <h1>{{ post.title }}</h1>
      <div class="meta">
        <span>作者 {{ post.authorName }}</span>
        <span>发布时间 {{ new Date(post.createdAt).toLocaleString() }}</span>
        <span>版权哈希 {{ post.blockchain?.copyrightHash }}</span>
      </div>
    </header>
    <article class="content">
      {{ post.content }}
    </article>
    <el-card class="chain-card" shadow="never">
      <template #header>
        <div class="card-header">
          <el-icon><Pointer /></el-icon>
          <span>链上版权信息</span>
        </div>
      </template>
      <el-descriptions :column="1" border>
        <el-descriptions-item label="交易哈希">
          {{ post.blockchain?.txHash }}
        </el-descriptions-item>
        <el-descriptions-item label="记录时间">
          <el-icon><Timer /></el-icon>
          {{ new Date(post.blockchain?.timestamp).toLocaleString() }}
        </el-descriptions-item>
        <el-descriptions-item label="签名地址">
          {{ post.blockchain?.signerAddress || post.authorName }}
        </el-descriptions-item>
        <el-descriptions-item label="签名">
          <code style="word-break: break-all;">{{ post.blockchain?.signature || '未签名' }}</code>
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
    <div class="actions">
      <el-button type="primary" :loading="likeLoading" @click="handleLike">
        点赞 ({{ post.likes }})
      </el-button>
    </div>
    <section class="comments">
      <h3>评论</h3>
      <el-form label-position="top">
        <el-form-item label="发表评论">
          <el-input
            v-model="commentForm.content"
            type="textarea"
            :rows="4"
            placeholder="分享你的想法..."
          />
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="handleComment">
            提交评论
          </el-button>
        </el-form-item>
      </el-form>
      <el-empty
        v-if="!post.comments.length"
        description="还没有评论，快来抢沙发吧~"
      />
      <el-timeline v-else>
        <el-timeline-item
          v-for="comment in post.comments"
          :key="comment.id"
          :timestamp="new Date(comment.createdAt).toLocaleString()"
        >
          <strong>{{ comment.author }}</strong>
          <p>{{ comment.content }}</p>
        </el-timeline-item>
      </el-timeline>
    </section>
  </section>
</template>

<style scoped>
.detail-page {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.back {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  color: #409eff;
}

.header h1 {
  margin-bottom: 12px;
}

.meta {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  color: #909399;
  font-size: 13px;
}

.content {
  line-height: 1.8;
  color: var(--color-text);
  white-space: pre-wrap;
}

.chain-card {
  border-radius: var(--radius-card);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
}

.actions {
  display: flex;
  gap: 12px;
}

.comments {
  border-top: 1px solid #ebeef5;
  padding-top: 16px;
}

.comments h3 {
  margin-bottom: 16px;
}
</style>
