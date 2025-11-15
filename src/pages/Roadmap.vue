<script setup>
</script>

<template>
  <section class="roadmap-page">
    <header class="hero">
      <h2>路线图</h2>
      <p>规划未来的功能迭代与优化方向。</p>
    </header>

    <el-card class="roadmap-card" shadow="hover">
      <template #header>
        <div class="card-header">
          <h3>计划</h3>
          <span class="meta">持续迭代中</span>
        </div>
      </template>
      <el-timeline>
        <el-timeline-item timestamp="v0.2">
          增加标签与分类、归档视图、作者目录与榜单。
        </el-timeline-item>
        <el-timeline-item timestamp="v0.3">
          增加文章编辑与版本管理；支持草稿、发布与审计日志。
        </el-timeline-item>
        <el-timeline-item timestamp="v0.4">
          引入暗黑模式与主题切换；强化无障碍与响应式适配。
        </el-timeline-item>
        <el-timeline-item timestamp="v0.5">
          打通真实链接口，支持交易查询与链上校验。
        </el-timeline-item>
      </el-timeline>
    </el-card>

    <el-card class="roadmap-card" shadow="hover">
      <template #header>
        <div class="card-header">
          <h3>里程碑</h3>
          <span class="meta">目标节点</span>
        </div>
      </template>
      <el-timeline>
        <el-timeline-item timestamp="v0.6">
          引入专题与学习路线，资源中心进一步扩充。
        </el-timeline-item>
        <el-timeline-item timestamp="v0.7">
          作者主页增强：关注、合集与徽章展示。
        </el-timeline-item>
        <el-timeline-item timestamp="v0.8">
          评论系统与通知中心，支持订阅与提醒。
        </el-timeline-item>
        <el-timeline-item timestamp="v1.0">
          接入真实链，开放 API 与导出备份能力。
        </el-timeline-item>
      </el-timeline>
    </el-card>

    <el-card class="roadmap-card" shadow="hover">
      <template #header>
        <div class="card-header">
          <h3>待选特性</h3>
          <span class="meta">收集与评估</span>
        </div>
      </template>
      <ul class="bullet-list">
        <li>标签/专题页增强：支持订阅与批量浏览。</li>
        <li>作者画像：贡献度、影响力与作品合集。</li>
        <li>搜索优化：高亮命中、过滤器与排序。</li>
        <li>导出与备份：Markdown、JSON 与链上校验。</li>
      </ul>
    </el-card>
  </section>
</template>

<style scoped>
.roadmap-page {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.roadmap-card {
  border-radius: var(--radius-card);
}

.bullet-list {
  margin: 0;
  padding-left: 18px;
}

.bullet-list li {
  line-height: 1.8;
}
</style>