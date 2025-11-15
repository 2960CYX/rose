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

const heroMetrics = [
  { value: '12K+', label: '已上链原创作品' },
  { value: '3.2M+', label: '累计可信浏览' },
  { value: '0 Gas', label: '创作上链额外成本' },
];

const heroSpotlight = [
  {
    title: '智能合约确权引擎',
    description: '发布即刻固化时间戳与内容指纹，多链可信流转。',
    stat: '45s 内完成上链',
  },
  {
    title: '分布式粉丝社群',
    description: '实时同步创作动态，跨平台订阅创造者价值。',
    stat: '180+ 合作社区',
  },
];

const insightPanels = [
  {
    tag: '内容保护',
    title: '自动化版权守护体系',
    description:
      'AI 辅助监测全网相似内容，触发链上证据保全，保障原创权益。',
    points: ['原创指纹比对', '侵权预警回溯', '证据一键出证'],
    accent: 'linear-gradient(135deg, rgba(59,130,246,0.18), rgba(56,189,248,0.08))',
  },
  {
    tag: '价值变现',
    title: '创作资产化发行',
    description: '内容与权益打包成可组合凭证，灵活定义售卖与分润规则。',
    points: ['可拆分授权层级', '链上收益实时分配', 'NFT 订阅凭证'],
    accent: 'linear-gradient(135deg, rgba(236,72,153,0.18), rgba(251,191,36,0.12))',
  },
  {
    tag: '协同创作',
    title: '多角色协作工作流',
    description: '从灵感、撰写到审稿签核，全流程透明可审计的协作体验。',
    points: ['智能任务分配', '审稿流转全记录', '跨团队权限管理'],
    accent: 'linear-gradient(135deg, rgba(139,92,246,0.18), rgba(59,130,246,0.1))',
  },
];

const innovationModules = [
  {
    title: '去中心化存储矩阵',
    description: 'IPFS + Arweave 多副本容错，内容永不丢失。',
    highlights: ['内容切片加密', '容灾自动恢复', '可验证下载日志'],
  },
  {
    title: '创作者数据驾驶舱',
    description: '实时掌握读者画像、订阅留存与链上收益。',
    highlights: ['跨平台聚合数据', 'AI 预测热度曲线', '自定义 KPI 看板'],
  },
  {
    title: '开放协议生态',
    description: '标准化 API 接入钱包、社区、发行等第三方应用。',
    highlights: ['可组合内容协议', '权限密钥网关', '即插即用组件市场'],
  },
];

const journeySteps = [
  {
    title: '创作发布',
    detail: '灵感写作、模版辅助与 AI 校对，发布瞬间完成链上签名。',
  },
  {
    title: '版权确权',
    detail: '自动生成内容指纹，时间戳与哈希广播至多链网络。',
  },
  {
    title: '价值变现',
    detail: '开启订阅、赞助、空投或 NFT 合集，多元化激励粉丝。',
  },
  {
    title: '数据增长',
    detail: '洞察读者行为，优化内容策略，持续扩大创作影响力。',
  },
];

const trustBadges = [
  'EVM 多链互通',
  '零知识隐私保护',
  '业内审计安全认证',
  '开放 API 标准',
];
</script>

<template>
  <section class="home-page">
    <header class="hero">
      <div class="hero-grid">
        <div class="hero-content">
          <div class="hero-badges">
            <span class="hero-badge">Web3 原创联盟</span>
            <span class="hero-badge badge-outline">多链可信协作</span>
          </div>
          <h1 class="headline-contrast">链上博客空间</h1>
          <p class="hero-subtitle">
            发布、分享并保护你的原创内容，以智能合约驱动版权确权与价值流转，构建下一代创作者经济体。
          </p>
          <div class="hero-metrics">
            <div v-for="metric in heroMetrics" :key="metric.label" class="metric">
              <span class="metric-value">{{ metric.value }}</span>
              <span class="metric-label">{{ metric.label }}</span>
            </div>
          </div>
          <div class="hero-actions">
            <el-button type="primary" class="button-cta" @click="router.push('/explore')">开始探索</el-button>
            <el-button text class="button-link" @click="router.push('/learn')">了解链上创作指南</el-button>
          </div>
          <div class="trust-badges">
            <span v-for="badge in trustBadges" :key="badge" class="trust-badge">{{ badge }}</span>
          </div>
        </div>
        <div class="hero-showcase">
          <div class="showcase-card primary">
            <div class="showcase-header">
              <span class="showcase-label">链上动态</span>
              <span class="showcase-status">实时同步</span>
            </div>
            <div class="showcase-body">
              <h3>创作者成长曲线</h3>
              <p>链上关注、收益与互动数据在一个仪表盘中即时呈现。</p>
              <ul>
                <li>粉丝增长 +126%</li>
                <li>作品收藏 +89%</li>
                <li>跨社区传播 34 城市</li>
              </ul>
            </div>
          </div>
          <div class="mini-cards">
            <div v-for="spot in heroSpotlight" :key="spot.title" class="showcase-card secondary">
              <h4>{{ spot.title }}</h4>
              <p>{{ spot.description }}</p>
              <span class="mini-stat">{{ spot.stat }}</span>
            </div>
          </div>
        </div>
      </div>
      <span class="glow-orb orb-1"></span>
      <span class="glow-orb orb-2"></span>
    </header>

    <section class="insight-panels">
      <article
        v-for="panel in insightPanels"
        :key="panel.title"
        class="insight-card"
        :style="{ '--panel-accent': panel.accent }"
      >
        <span class="insight-tag">{{ panel.tag }}</span>
        <h3>{{ panel.title }}</h3>
        <p>{{ panel.description }}</p>
        <ul>
          <li v-for="point in panel.points" :key="point">
            <span class="bullet"></span>
            <span>{{ point }}</span>
          </li>
        </ul>
      </article>
    </section>

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

    <section class="innovation-section">
      <h2 class="section-title">全流程创新工具</h2>
      <p class="section-meta">为创作者提供从构思到分发的全栈能力组件</p>
      <div class="innovation-grid">
        <article v-for="module in innovationModules" :key="module.title" class="innovation-card">
          <h3>{{ module.title }}</h3>
          <p>{{ module.description }}</p>
          <ul>
            <li v-for="highlight in module.highlights" :key="highlight">
              <span class="bullet"></span>
              <span>{{ highlight }}</span>
            </li>
          </ul>
        </article>
      </div>
    </section>

    <section class="journey-section">
      <div class="journey-header">
        <h2>四步开启链上创作旅程</h2>
        <p>以链上可信数据串联每一个创作决策，打通内容、版权与收益。</p>
      </div>
      <div class="journey-track">
        <div v-for="(step, index) in journeySteps" :key="step.title" class="journey-step">
          <div class="step-index">0{{ index + 1 }}</div>
          <div class="step-body">
            <h3>{{ step.title }}</h3>
            <p>{{ step.detail }}</p>
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<style scoped>
.home-page {
  display: flex;
  flex-direction: column;
  gap: var(--page-gap);
}

.hero {
  overflow: hidden;
}

.hero-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 32px;
  position: relative;
  z-index: 1;
}

.hero-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.hero-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.16);
  font-size: var(--font-sm);
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.hero-badge::before {
  content: '';
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.7);
  box-shadow: 0 0 12px rgba(255, 255, 255, 0.6);
}

.badge-outline {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.35);
}

.hero h1 {
  margin: 0;
  font-size: 38px;
  font-weight: 700;
  letter-spacing: 0.02em;
}

.hero-subtitle {
  margin: 0;
  font-size: 17px;
  line-height: 1.7;
  max-width: 520px;
  color: rgba(255, 255, 255, 0.9);
}

.hero-metrics {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 18px;
}

.metric {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 12px 16px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.14);
  backdrop-filter: blur(6px);
}

.metric-value {
  font-size: 24px;
  font-weight: 700;
  color: #fff;
}

.metric-label {
  font-size: var(--font-sm);
  color: rgba(255, 255, 255, 0.8);
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}

.button-link {
  color: #fff !important;
  font-weight: 600;
}

.trust-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.trust-badge {
  padding: 6px 14px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.12);
  font-size: 13px;
  letter-spacing: 0.02em;
}

.hero-showcase {
  display: grid;
  gap: 16px;
}

.showcase-card {
  position: relative;
  border-radius: 18px;
  background: rgba(13, 17, 23, 0.25);
  color: #fff;
  padding: 22px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.16);
  backdrop-filter: blur(12px);
}

.showcase-card.primary {
  min-height: 240px;
  background: linear-gradient(140deg, rgba(15, 23, 42, 0.8), rgba(30, 64, 175, 0.6));
}

.showcase-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: var(--font-sm);
  opacity: 0.8;
}

.showcase-body {
  margin-top: 18px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.showcase-body h3 {
  margin: 0;
  font-size: 22px;
}

.showcase-body ul {
  padding-left: 18px;
  margin: 6px 0 0;
  display: grid;
  gap: 6px;
}

.mini-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 16px;
}

.showcase-card.secondary {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.28), rgba(59, 130, 246, 0.1));
}

.showcase-card.secondary h4 {
  margin: 0 0 6px;
  font-size: 18px;
}

.showcase-card.secondary p {
  margin: 0;
  font-size: 14px;
  line-height: 1.6;
}

.mini-stat {
  display: inline-flex;
  margin-top: 10px;
  padding: 4px 10px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.16);
  font-size: 12px;
  letter-spacing: 0.03em;
}

.glow-orb {
  position: absolute;
  width: 220px;
  height: 220px;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.75;
}

.orb-1 {
  background: rgba(56, 189, 248, 0.55);
  top: -40px;
  right: 10%;
}

.orb-2 {
  background: rgba(236, 72, 153, 0.45);
  bottom: -60px;
  left: 5%;
}

.insight-panels {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: var(--page-gap);
}

.insight-card {
  position: relative;
  padding: 26px;
  border-radius: 20px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.65));
  box-shadow: var(--shadow-card);
  border: 1px solid rgba(255, 255, 255, 0.6);
}

.insight-card::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 20px;
  background: var(--panel-accent);
  opacity: 0.65;
  z-index: -1;
}

.insight-tag {
  display: inline-flex;
  padding: 4px 10px;
  border-radius: 999px;
  background: rgba(59, 130, 246, 0.12);
  color: var(--color-primary);
  font-size: 12px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.insight-card h3 {
  margin: 16px 0 10px;
  font-size: 20px;
}

.insight-card p {
  margin: 0 0 16px;
  color: var(--color-text);
}

.insight-card ul {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 8px;
}

.insight-card li {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}

.bullet {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--gradient-accent-start);
}

.post-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--space-lg);
}

.hot-list,
.author-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-sm);
}

.hot-list li,
.author-list li {
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

.hot-title {
  font-weight: 600;
}

.hot-meta,
.author-meta {
  color: var(--color-muted);
  font-size: var(--font-sm);
}

.author-name {
  font-weight: 600;
}

.innovation-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 32px;
  border-radius: 28px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.92), rgba(226, 232, 240, 0.86));
  box-shadow: var(--shadow-card-hover);
}

.innovation-section .section-title {
  margin: 0;
  font-size: 28px;
  font-weight: 700;
  background: linear-gradient(90deg, var(--gradient-accent-start), var(--gradient-accent-end));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.innovation-section .section-meta {
  margin: 0 0 12px;
  color: var(--color-muted);
}

.innovation-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
}

.innovation-card {
  padding: 22px;
  border-radius: 18px;
  background: #fff;
  border: 1px solid rgba(148, 163, 184, 0.25);
  box-shadow: var(--shadow-card);
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.innovation-card h3 {
  margin: 0;
  font-size: 20px;
}

.innovation-card p {
  margin: 0;
  color: var(--color-text);
}

.innovation-card ul {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 8px;
}

.innovation-card li {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}

.journey-section {
  padding: 32px;
  border-radius: 28px;
  background: radial-gradient(circle at top right, rgba(59, 130, 246, 0.1), transparent 55%),
    #0f172a;
  color: #fff;
  display: flex;
  flex-direction: column;
  gap: 24px;
  position: relative;
  overflow: hidden;
}

.journey-section::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at bottom left, rgba(236, 72, 153, 0.2), transparent 60%);
  pointer-events: none;
}

.journey-header {
  position: relative;
  z-index: 1;
}

.journey-header h2 {
  margin: 0 0 12px;
  font-size: 26px;
}

.journey-header p {
  margin: 0;
  max-width: 520px;
  color: rgba(255, 255, 255, 0.78);
}

.journey-track {
  position: relative;
  z-index: 1;
  display: grid;
  gap: 16px;
}

.journey-step {
  display: grid;
  grid-template-columns: 80px 1fr;
  gap: 18px;
  align-items: start;
  padding: 18px 20px;
  border-radius: 16px;
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
}

.step-index {
  font-size: 24px;
  font-weight: 700;
  color: rgba(96, 165, 250, 0.9);
}

.step-body h3 {
  margin: 0 0 6px;
  font-size: 18px;
}

.step-body p {
  margin: 0;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
}

@media (max-width: 768px) {
  .hero {
    padding: 24px;
  }

  .journey-section,
  .innovation-section {
    padding: 24px;
  }

  .journey-step {
    grid-template-columns: 1fr;
  }

  .step-index {
    order: -1;
  }
}
</style>
