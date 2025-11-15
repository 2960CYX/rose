<script setup>
</script>

<template>
  <section class="learn-page">
    <header class="hero">
      <h2>学习区块链与链上创作</h2>
      <p>从入门到进阶，快速掌握在 BlogChain 上进行链上创作的关键知识。</p>
    </header>

    <el-card class="section-card" shadow="hover">
      <template #header>
        <div class="card-header">
          <h3>入门指南</h3>
          <span class="meta">初次使用建议从这里开始</span>
        </div>
      </template>
      <el-timeline>
        <el-timeline-item timestamp="Step 1">
          注册并登录账户，系统会为你生成钱包地址用于标识与签名。
        </el-timeline-item>
        <el-timeline-item timestamp="Step 2">
          连接钱包（模拟环境），确保发布时可记录链上版权信息。
        </el-timeline-item>
        <el-timeline-item timestamp="Step 3">
          在“写博客”页面撰写并发布你的原创文章。
        </el-timeline-item>
        <el-timeline-item timestamp="Step 4">
          发布成功后可在详情页查看交易哈希、版权哈希与记录时间。
        </el-timeline-item>
      </el-timeline>
  </el-card>

  <el-card class="section-card" shadow="hover">
      <template #header>
        <div class="card-header">
          <h3>版权与链</h3>
          <span class="meta">“创作即版权”的核心理念</span>
        </div>
      </template>
      <ul class="bullet-list">
        <li>不可篡改：版权信息写入链上，任何人可公开验证。</li>
        <li>时间戳：记录创作的确切时间，形成先后顺序的证据。</li>
        <li>哈希指纹：通过内容哈希构成作品的唯一指纹。</li>
        <li>开放验证：交易哈希与版权哈希均可在详情页查看。</li>
      </ul>
  </el-card>

  <el-card class="section-card" shadow="hover">
      <template #header>
        <div class="card-header">
          <h3>进阶实践</h3>
          <span class="meta">提升内容质量与传播效率</span>
        </div>
      </template>
      <div class="grid">
        <div class="grid-item">
          <h4>写作建议</h4>
          <p>标题简洁明确；摘要概括核心观点；正文结构清晰、层次分明。</p>
        </div>
        <div class="grid-item">
          <h4>互动与传播</h4>
          <p>善用点赞与评论互动，及时回复读者，提升文章热度与影响力。</p>
        </div>
        <div class="grid-item">
          <h4>版本与更迭</h4>
          <p>重要改动可作为新版本发布，保留版本记录以便审计与对比。</p>
        </div>
      </div>
  </el-card>

  <el-card class="section-card" shadow="hover">
    <template #header>
      <div class="card-header">
        <h3>术语速查</h3>
        <span class="meta">快速理解常见关键词</span>
      </div>
    </template>
    <ul class="bullet-list">
      <li>交易哈希（TxHash）：一次上链记录的唯一标识符。</li>
      <li>版权哈希：文章相关信息计算得到的指纹，用于原创证明。</li>
      <li>时间戳：记录数据写入链上的具体时间。</li>
      <li>不可篡改：链上数据一旦写入便难以更改。</li>
    </ul>
  </el-card>

  <el-card class="section-card" shadow="hover">
    <template #header>
      <div class="card-header">
        <h3>常见误区</h3>
        <span class="meta">避免走弯路</span>
      </div>
    </template>
    <ul class="bullet-list">
      <li>误区：链上即等于真实发布。实际演示环境为本地模拟。</li>
      <li>误区：所有改动都要上链。建议只在版本稳定时记录关键版本。</li>
      <li>误区：内容越多越好。结构化写作与摘要更为重要。</li>
    </ul>
  </el-card>

  <el-card class="section-card" shadow="hover">
    <template #header>
      <div class="card-header">
        <h3>写作模板</h3>
        <span class="meta">可复制的结构示例</span>
      </div>
    </template>
    <div class="grid">
      <div class="grid-item">
        <h4>技术文章</h4>
        <p>摘要 → 背景与问题 → 方案概述 → 实现细节 → 示例 → 总结与参考。</p>
      </div>
      <div class="grid-item">
        <h4>教程/入门</h4>
        <p>前置条件 → 步骤清单 → 每步截图/代码 → 常见错误 → FAQ。</p>
      </div>
      <div class="grid-item">
        <h4>经验分享</h4>
        <p>背景 → 遇到的问题 → 解决思路 → 结果与复盘 → 建议。</p>
      </div>
    </div>
  </el-card>
</section>
</template>

<style scoped>
.learn-page {
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

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
}

.grid-item h4 {
  margin: 0 0 8px;
}
</style>