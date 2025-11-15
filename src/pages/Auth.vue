<script setup>
import { reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { useUserStore } from '../stores/user';

const router = useRouter();
const route = useRoute();
const userStore = useUserStore();

const activeTab = ref('login');
const loginForm = reactive({
  username: '',
  password: '',
});
const registerForm = reactive({
  username: '',
  password: '',
  confirmPassword: '',
});

const redirectTo = () => {
  const redirect = route.query.redirect || '/';
  router.push(redirect);
};

const handleLogin = () => {
  if (!loginForm.username || !loginForm.password) {
    ElMessage.warning('请输入用户名和密码');
    return;
  }
  try {
    userStore.login({
      username: loginForm.username,
      password: loginForm.password,
    });
    ElMessage.success('登录成功');
    redirectTo();
  } catch (error) {
    ElMessage.error(error.message || '登录失败');
  }
};

const handleRegister = () => {
  if (!registerForm.username || !registerForm.password) {
    ElMessage.warning('请输入完整信息');
    return;
  }
  if (registerForm.password !== registerForm.confirmPassword) {
    ElMessage.error('两次输入的密码不一致');
    return;
  }
  try {
    const user = userStore.register({
      username: registerForm.username,
      password: registerForm.password,
    });
    ElMessage.success(`注册成功！已生成钱包地址：${user.walletAddress}`);
    redirectTo();
  } catch (error) {
    ElMessage.error(error.message || '注册失败');
  }
};

const handleGuest = () => {
  try {
    const user = userStore.guestLogin();
    ElMessage.success(`已使用游客账户登录：${user.username}`);
    redirectTo();
  } catch (error) {
    ElMessage.error(error.message || '假登录失败');
  }
};
</script>

<template>
  <section class="auth-page">
    <el-card class="auth-card" shadow="hover">
      <h2>欢迎来到链上博客</h2>
      <p class="subtitle">登录或注册，开始你的链上创作之旅</p>
      <el-tabs v-model="activeTab" stretch>
        <el-tab-pane label="登录" name="login">
          <el-form label-position="top" class="form">
            <el-form-item label="用户名">
              <el-input v-model="loginForm.username" placeholder="请输入用户名" />
            </el-form-item>
            <el-form-item label="密码">
              <el-input
                v-model="loginForm.password"
                type="password"
                placeholder="请输入密码"
              />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" class="full-width" @click="handleLogin">
                登录
              </el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="注册" name="register">
          <el-form label-position="top" class="form">
            <el-form-item label="用户名">
              <el-input
                v-model="registerForm.username"
                placeholder="请输入用户名"
              />
            </el-form-item>
            <el-form-item label="密码">
              <el-input
                v-model="registerForm.password"
                type="password"
                placeholder="请输入密码"
              />
            </el-form-item>
            <el-form-item label="确认密码">
              <el-input
                v-model="registerForm.confirmPassword"
                type="password"
                placeholder="请再次输入密码"
              />
            </el-form-item>
            <el-alert
              type="info"
              show-icon
              :closable="false"
              title="注册后将自动生成一个链上钱包地址并绑定到您的账号。"
            />
            <el-form-item>
              <el-button
                type="success"
                class="full-width"
                @click="handleRegister"
              >
                注册并生成钱包
              </el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <el-divider>或</el-divider>
<el-alert
        type="info"
        show-icon
        :closable="false"
        title="假登录用于快速体验，账号数据仅保存在本地。"
        class="mb-12"
      />
      <el-button type="info" plain class="full-width" @click="handleGuest">
        一键体验（假登录）
      </el-button>
    </el-card>
  </section>
</template>

<style scoped>
.auth-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 96px);
}

.auth-card {
  width: 420px;
  padding: 32px;
  border-radius: var(--radius-card);
}

.subtitle {
  color: var(--color-muted);
  margin-bottom: 24px;
}

.form {
  margin-top: var(--space-md);
}

.full-width {
  width: 100%;
}
/* divider spacing tweak */
:deep(.el-divider) {
  margin: var(--space-md) 0;
}
</style>
