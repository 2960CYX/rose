<script setup>
import { reactive, ref } from 'vue';
import { ElMessage } from 'element-plus';

const form = reactive({
  name: '',
  email: '',
  message: '',
});
const submitting = ref(false);

const handleSubmit = async () => {
  if (!form.name || !form.email || !form.message) {
    ElMessage.warning('请填写完整的姓名、邮箱与留言内容');
    return;
  }
  submitting.value = true;
  try {
    // 演示环境仅展示反馈效果，不做实际发送
    await new Promise((r) => setTimeout(r, 600));
    ElMessage.success('已收到你的留言，我们会尽快联系你！');
    form.name = '';
    form.email = '';
    form.message = '';
  } catch (error) {
    ElMessage.error(error.message || '发送失败，请稍后重试');
  } finally {
    submitting.value = false;
  }
};
</script>

<template>
  <section class="contact-page">
    <header class="hero">
      <h2>联系我们</h2>
      <p>欢迎留言交流合作或反馈问题。</p>
    </header>

    <el-card class="contact-card" shadow="hover">
      <template #header>
        <div class="card-header">
          <h3>留言板</h3>
          <span class="meta">非实时客服，演示环境不做实际发送</span>
        </div>
      </template>
      <el-form label-position="top" :model="form" class="form">
        <el-form-item label="姓名">
          <el-input v-model="form.name" placeholder="如何称呼你" />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form.email" placeholder="用于回复的邮箱地址" />
        </el-form-item>
        <el-form-item label="留言内容">
          <el-input v-model="form.message" type="textarea" :rows="8" placeholder="描述你的问题或诉求..." />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="submitting" @click="handleSubmit">提交</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="contact-card" shadow="hover">
      <template #header>
        <div class="card-header">
          <h3>更多渠道</h3>
        </div>
      </template>
      <ul class="bullet-list">
        <li>电子邮箱：support@blogchain.example</li>
        <li>社区论坛：community.blogchain.example</li>
        <li>文档中心：docs.blogchain.example</li>
      </ul>
    </el-card>
  </section>
  
</template>

<style scoped>
.contact-page {
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

.bullet-list {
  margin: 0;
  padding-left: 18px;
}

.bullet-list li { 
  line-height: 1.8;
}

.form {
  max-width: 720px;
}
</style>