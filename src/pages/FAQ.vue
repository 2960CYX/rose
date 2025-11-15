<script setup>
import { ref } from 'vue';
const active = ref(['q1']);
</script>

<template>
  <section class="faq-page">
    <el-card class="faq-card" shadow="hover">
      <template #header>
        <div class="card-header">
          <h2>常见问题 FAQ</h2>
          <span class="meta">快速了解使用过程中的疑问</span>
        </div>
      </template>
      <el-collapse v-model="active">
        <el-collapse-item name="q1" title="如何注册并登录？">
          <p>在“登录 / 注册”页面填写用户名与密码即可注册；注册成功后会生成专属钱包地址。随后可使用账户登录。</p>
        </el-collapse-item>
        <el-collapse-item name="q2" title="钱包有什么作用？">
          <p>钱包用于标识与签名，文章发布时生成链上版权信息（交易哈希与版权哈希）。在模拟环境中，系统会自动管理钱包地址。</p>
        </el-collapse-item>
        <el-collapse-item name="q3" title="如何发布文章？">
          <p>登录后在“写博客”页面填写标题与内容，点击“发布文章”。发布完成后可在详情页查看版权信息。</p>
        </el-collapse-item>
        <el-collapse-item name="q4" title="版权信息是否真实上链？">
          <p>当前为教学/演示环境，采用本地模拟记录版权信息，便于理解“创作即版权”的流程与展示方式。</p>
        </el-collapse-item>
        <el-collapse-item name="q5" title="密码忘记了怎么办？">
          <p>演示环境不支持找回密码功能，请重新注册新账户使用。正式环境建议结合邮箱或多因素认证。</p>
        </el-collapse-item>
        <el-collapse-item name="q6" title="可以删除或修改文章吗？">
          <p>演示环境不提供删除功能。若需重大修改，建议以新的版本重新发布，以保留可审计的版本记录。</p>
        </el-collapse-item>
        <el-collapse-item name="q7" title="是否支持标签与专题？">
          <p>已提供“标签”和“专题”页面，帮助你按主题浏览内容与学习路径。</p>
        </el-collapse-item>
        <el-collapse-item name="q8" title="如何置顶或推荐文章？">
          <p>演示环境通过“热门”与“最新”区块展示内容。正式环境可引入置顶与推荐规则。</p>
        </el-collapse-item>
        <el-collapse-item name="q9" title="是否支持导出或备份？">
          <p>当前数据保存在本地存储。你可以通过浏览器的导出/备份机制或脚本进行迁移。</p>
        </el-collapse-item>
        <el-collapse-item name="q10" title="如何举报不当内容？">
          <p>演示环境不提供举报机制。正式环境建议增加“举报”入口与审核流程。</p>
        </el-collapse-item>
        <el-collapse-item name="q11" title="是否有暗黑模式？">
          <p>主题系统已预留样式变量，后续会加入暗黑模式切换以提升阅读体验。</p>
        </el-collapse-item>
        <el-collapse-item name="q12" title="数据是否会丢失？">
          <p>本地存储可能因浏览器清理而被移除。重要内容建议同步保存到外部笔记或仓库。</p>
        </el-collapse-item>
      </el-collapse>
    </el-card>
  </section>
</template>

<style scoped>
.faq-page {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.faq-card {
  border-radius: 16px;
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
</style>