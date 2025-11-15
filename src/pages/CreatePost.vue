<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { useUserStore } from '../stores/user';
import { usePostStore } from '../stores/post';

const router = useRouter();
const userStore = useUserStore();
const postStore = usePostStore();

const form = reactive({
  title: '',
  content: '',
});

const submitting = ref(false);

const handleSubmit = async () => {
  if (!form.title || !form.content) {
    ElMessage.warning('请填写完整的标题和内容');
    return;
  }
  if (!userStore.currentUser) {
    ElMessage.error('请先登录后再发布文章');
    router.push('/auth');
    return;
  }
  if (!userStore.connectedAddress) {
    const addr = await userStore.connectWallet();
    if (!addr) {
      ElMessage.error('请先连接钱包');
      return;
    }
  }
  submitting.value = true;
  try {
    const post = await postStore.createPost({
      title: form.title,
      content: form.content,
      authorId: userStore.currentUser.id,
      authorName: userStore.currentUser.username,
    });
    ElMessage.success('文章发布成功，版权已记录在链上');
    router.push({ name: 'PostDetail', params: { id: post.id } });
  } catch (error) {
    ElMessage.error(error.message || '文章发布失败');
  } finally {
    submitting.value = false;
  }
};
</script>

<template>
  <section class="create-page">
    <el-card class="create-card" shadow="hover">
      <header class="card-header">
        <div>
          <h2>发布新文章</h2>
          <p>文章发布时将自动记录链上版权信息，确保原创权益。</p>
        </div>
        <el-tag v-if="userStore.connectedAddress" type="success">
          钱包 {{ userStore.connectedAddress }}
        </el-tag>
      </header>
      <el-form label-position="top" :model="form" class="form">
        <el-form-item label="文章标题">
          <el-input
            v-model="form.title"
            placeholder="为你的文章起一个吸引人的标题"
          />
        </el-form-item>
        <el-form-item label="文章内容">
          <el-input
            v-model="form.content"
            type="textarea"
            :rows="12"
            placeholder="在这里撰写你的原创内容..."
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            :loading="submitting"
            @click="handleSubmit"
          >
            发布文章
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </section>
</template>

<style scoped>
.create-page {
  display: flex;
  justify-content: center;
}

.create-card {
  width: 100%;
  border-radius: var(--radius-card);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
  gap: 16px;
}

.card-header h2 {
  margin: 0 0 8px;
}

.card-header p {
  margin: 0;
  color: #909399;
}
</style>
