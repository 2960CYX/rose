<script setup>
</script>

<template>
  <section class="about-page">
    <el-card class="about-card" shadow="hover">
      <template #header>
        <div class="card-header">
          <h2>关于 BlogChain</h2>
        </div>
      </template>
      <p>
        BlogChain 是一个以区块链为理念的简易博客系统，旨在模拟“创作即版权”的体验：文章发布后会生成链上版权信息（交易哈希、版权哈希与时间），让创作更透明可信。
      </p>
      <el-divider />
      <h3>核心特性</h3>
      <ul class="feature-list">
        <li>账号体系：支持注册/登录与钱包地址绑定</li>
        <li>文章创作：发布时自动生成链上版权信息</li>
        <li>互动反馈：点赞与评论，帮助内容传播</li>
        <li>探索与搜索：快速发现热门内容与检索文章</li>
      </ul>
      <el-divider />
      <h3>技术栈</h3>
      <ul class="feature-list">
        <li>前端：Vue3 + Vite + Element Plus + Pinia</li>
        <li>模拟链：本地服务模拟记录版权信息</li>
      </ul>
      <el-divider />
      <h3>愿景与用途</h3>
      <ul class="feature-list">
        <li>教学演示：帮助理解“创作即版权”的流程与要点</li>
        <li>个人写作：快速搭建自己的作品集与博客</li>
        <li>团队协作：围绕主题与专题组织内容与学习路线</li>
      </ul>
      <el-divider />
      <h3>使用建议</h3>
      <ul class="feature-list">
        <li>结构化写作：先写摘要与目录，再逐步充实细节</li>
        <li>版本管理：重要改动以新版本发布，形成可审计记录</li>
        <li>定期备份：导出文本到本地或仓库，避免数据丢失</li>
      </ul>
    </el-card>
  </section>
</template>

<style scoped>
.about-page {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.about-card {
  border-radius: var(--radius-card);
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.feature-list {
  margin: 0;
  padding-left: 18px;
}

.feature-list li {
  line-height: 1.8;
}
</style>