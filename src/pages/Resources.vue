<script setup>
</script>

<template>
  <section class="resources-page">
    <header class="hero">
      <h2>资源中心</h2>
      <p>精选文档、社区与工具，帮助你深入学习与创作。</p>
    </header>

    <el-card class="resources-card" shadow="hover">
      <template #header>
        <div class="card-header">
          <h3>文档与教程</h3>
        </div>
      </template>
      <ul class="bullet-list">
        <li>Vue 官方文档：vuejs.org</li>
        <li>Pinia 状态管理：pinia.vuejs.org</li>
        <li>Element Plus 组件库：element-plus.org</li>
        <li>Ethers.js 文档：docs.ethers.org</li>
      </ul>
    </el-card>

    <el-card class="resources-card" shadow="hover">
      <template #header>
        <div class="card-header">
          <h3>社区与讨论</h3>
        </div>
      </template>
      <ul class="bullet-list">
        <li>Stack Overflow：编程问答社区</li>
        <li>dev.to：开发者技术分享社区</li>
        <li>Reddit r/ethereum：以太坊相关讨论</li>
      </ul>
    </el-card>

    <el-card class="resources-card" shadow="hover">
      <template #header>
        <div class="card-header">
          <h3>创作与版权工具</h3>
        </div>
      </template>
      <ul class="bullet-list">
        <li>Markdown 编辑器：Typora / Obsidian</li>
        <li>图像压缩：Squoosh.app</li>
        <li>哈希校验工具：在线 SHA / Keccak 工具</li>
      </ul>
    </el-card>
    
    <el-card class="resources-card" shadow="hover">
      <template #header>
        <div class="card-header">
          <h3>工具与脚手架</h3>
          <span class="meta">提升开发效率</span>
        </div>
      </template>
      <ul class="bullet-list">
        <li>Hardhat / Foundry：以太坊智能合约开发与测试套件。</li>
        <li>Vite：快速的前端构建工具，适合演示项目。</li>
        <li>Pinia：轻量状态管理，已用于本项目的用户与文章。</li>
        <li>Element Plus：优雅的组件库，简化常见页面搭建。</li>
      </ul>
    </el-card>

    <el-card class="resources-card" shadow="hover">
      <template #header>
        <div class="card-header">
          <h3>学习路线建议</h3>
          <span class="meta">从入门到进阶</span>
        </div>
      </template>
      <ol class="numbered-list">
        <li>前端基础：HTML/CSS/JS 与组件化框架（Vue）。</li>
        <li>区块链基础：账户、交易、哈希、不可篡改与共识。</li>
        <li>合约开发：编写与测试简单的版权记录合约。</li>
        <li>整合演示：把写作平台与合约调用结合，串联流程。</li>
      </ol>
    </el-card>
  </section>
</template>

<style scoped>
.resources-page {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.resources-card {
  border-radius: var(--radius-card);
}

.bullet-list {
  margin: 0;
  padding-left: 18px;
}

.bullet-list li {
  line-height: 1.8;
}

.numbered-list {
  margin: 0;
  padding-left: 18px;
}

.numbered-list li {
  line-height: 1.8;
}
</style>