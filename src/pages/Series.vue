<script setup>
import PageSection from '../components/PageSection.vue';
</script>

<template>
  <section class="series-page">
    <header class="hero">
      <h2 class="headline-contrast">专题</h2>
      <p>围绕特定主题的精选文章与学习路径。</p>
      <div class="hero-actions">
        <el-button type="primary" class="button-cta">开始学习</el-button>
      </div>
    </header>

    <PageSection title="链上入门" meta="从零开始理解“创作即版权”">
      <ul class="bullet-list">
        <li>区块链基础概念与术语</li>
        <li>本项目的模拟链与版权记录机制</li>
        <li>如何发布第一篇链上文章</li>
      </ul>
    </PageSection>

    <PageSection title="工程实践" meta="统一样式与组件化开发">
      <ul class="bullet-list">
        <li>主题变量与卡片圆角统一</li>
        <li>页面结构与复用组件</li>
        <li>列表、卡片与时间线的搭配使用</li>
      </ul>
    </PageSection>

    <PageSection title="写作与设计" meta="结构化写作与视觉一致性">
      <ul class="bullet-list">
        <li>写作模板与摘要撰写</li>
        <li>统一视觉风格与留白层次</li>
        <li>如何构建可读性强的技术文章</li>
      </ul>
    </PageSection>
  </section>
</template>

<style scoped>
.series-page {
  display: flex;
  flex-direction: column;
  gap: var(--page-gap);
}

.series-card {
  border-radius: var(--radius-card);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.hero-actions {
  margin-top: var(--space-sm);
}

.bullet-list {
  margin: 0;
  padding-left: 18px;
}

.bullet-list li {
  line-height: 1.8;
}

.series-card:hover {
  transform: translateY(-2px);
}
</style>
