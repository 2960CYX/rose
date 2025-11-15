<script setup>
import { computed, ref, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { useUserStore } from '../stores/user';
import { Moon, Sunny } from '@element-plus/icons-vue';

const router = useRouter();
const route = useRoute();
const userStore = useUserStore();
const activePath = ref(route.path);

const navItems = [
  { label: '首页', path: '/' },
  { label: '探索', path: '/explore' },
  { label: '知识库', path: '/learn' },
  { label: '搜索', path: '/search' },
  { label: '写博客', path: '/create' },
  { label: '个人中心', path: '/profile' },
  { label: '榜单', path: '/leaderboard' },
  { label: '关于', path: '/about' },
  {
    label: '更多',
    children: [
      { label: '标签', path: '/tags' },
      { label: '专题', path: '/series' },
      { label: '归档', path: '/archives' },
      { label: '作者', path: '/authors' },
      { label: '资源', path: '/resources' },
      { label: '路线图', path: '/roadmap' },
      { label: 'FAQ', path: '/faq' },
      { label: '联系我们', path: '/contact' },
    ],
  },
];

watch(
  () => route.path,
  (path) => {
    activePath.value = path;
  }
);

const shortAddress = computed(() => {
  if (!userStore.connectedAddress) return '连接钱包';
  const addr = userStore.connectedAddress;
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
});

const handleSelect = (path) => {
  if (path === '/create' || path === '/profile') {
    if (!userStore.isAuthenticated) {
      ElMessage.warning('请先登录');
      router.push({ name: 'Auth', query: { redirect: path } });
      return;
    }
  }
  router.push(path);
};

const handleAuthClick = () => {
  if (userStore.isAuthenticated) {
    userStore.logout();
    ElMessage.success('已退出登录');
    router.push('/');
  } else {
    router.push('/auth');
  }
};

const handleWalletClick = () => {
  const address = userStore.connectWallet();
  if (address) {
    ElMessage.success('钱包连接成功');
  }
};

const handleLogoClick = () => {
  router.push('/');
};

const goProfile = () => {
  if (userStore.isAuthenticated) {
    router.push('/profile');
  } else {
    handleSelect('/profile');
  }
};

const isDark = ref(false);
const applyTheme = (dark) => {
  const theme = dark ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  isDark.value = dark;
};
const toggleTheme = () => {
  applyTheme(!isDark.value);
};
onMounted(() => {
  const saved = localStorage.getItem('theme');
  applyTheme(saved === 'dark');
  const accentSaved = localStorage.getItem('accent');
  if (accentSaved) {
    try {
      const p = JSON.parse(accentSaved);
      applyAccent(p);
    } catch {}
  }
});

const palettes = [
  { name: 'Aurora', start: '#6a5acd', end: '#34c8fa' },
  { name: 'Cyber', start: '#00ffd5', end: '#ff00c8' },
  { name: 'Neon', start: '#7b2cff', end: '#00e5ff' },
  { name: 'DeepBlue', start: '#3a7bd5', end: '#00d2ff' },
];

const applyAccent = (p) => {
  document.documentElement.style.setProperty('--gradient-accent-start', p.start);
  document.documentElement.style.setProperty('--gradient-accent-end', p.end);
  document.documentElement.style.setProperty('--hero-gradient-start', p.start);
  document.documentElement.style.setProperty('--hero-gradient-end', p.end);
  localStorage.setItem('accent', JSON.stringify(p));
};
</script>

<template>
  <header class="app-header">
    <div class="header-left" @click="handleLogoClick">
      <img src="/vite.svg" alt="logo" class="logo" />
      <span class="title">BlogChain</span>
    </div>
    <nav class="nav-menu">
      <el-menu
        mode="horizontal"
        :ellipsis="false"
        :default-active="activePath"
        class="nav-menu-inner"
        @select="handleSelect"
      >
        <template v-for="item in navItems" :key="item.label">
          <el-sub-menu v-if="item.children" index="more">
            <template #title>{{ item.label }}</template>
            <el-menu-item
              v-for="sub in item.children"
              :key="sub.path"
              :index="sub.path"
            >
              {{ sub.label }}
            </el-menu-item>
          </el-sub-menu>
          <el-menu-item v-else :index="item.path">
            {{ item.label }}
          </el-menu-item>
        </template>
      </el-menu>
    </nav>
    <div class="header-actions">
      <el-button type="primary" @click="handleWalletClick">
        {{ shortAddress }}
      </el-button>
      <el-button v-if="userStore.isAuthenticated" @click="goProfile">
        {{ userStore.currentUser?.username || '我的账户' }}
      </el-button>
      <el-button type="primary" plain @click="handleAuthClick">
        {{ userStore.isAuthenticated ? '退出登录' : '登录 / 注册' }}
      </el-button>
      <el-button text @click="toggleTheme">
        <el-icon v-if="isDark"><Moon /></el-icon>
        <el-icon v-else><Sunny /></el-icon>
      </el-button>
      <el-popover placement="bottom-end" trigger="click">
        <template #reference>
          <el-button text>主题色</el-button>
        </template>
        <div class="accent-panel">
          <span
            v-for="p in palettes"
            :key="p.name"
            class="accent-chip"
            :title="p.name"
            :style="{ '--chip-start': p.start, '--chip-end': p.end }"
            @click="applyAccent(p)"
          />
        </div>
      </el-popover>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--header-height);
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(255, 255, 255, 0.85);
  padding: 0 24px;
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border-color);
  z-index: 20;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.06);
}

.header-left {
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 8px;
}

.logo {
  width: 32px;
  height: 32px;
}

.title {
  font-size: 18px;
  font-weight: 600;
  color: #303133;
}

.nav-menu {
  flex: 1;
  display: flex;
  justify-content: center;
}

.nav-menu-inner {
  border-bottom: none;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}
</style>
