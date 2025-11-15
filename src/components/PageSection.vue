<script setup>
const props = defineProps({
  title: { type: String, default: '' },
  meta: { type: String, default: '' },
});
</script>

<template>
  <el-card class="section-card" shadow="hover">
    <template #header>
      <div class="card-header">
        <div>
          <h3 class="headline-gradient" v-if="props.title">{{ props.title }}</h3>
          <span class="meta" v-if="props.meta">{{ props.meta }}</span>
        </div>
        <div class="actions">
          <slot name="actions" />
        </div>
      </div>
    </template>
    <slot />
  </el-card>
</template>

<style scoped>
.actions {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}
</style>

