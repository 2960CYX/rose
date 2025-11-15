<script setup>
import { RouterView } from 'vue-router';
import AppHeader from './components/AppHeader.vue';
</script>

<template>
  <div class="app-shell">
    <AppHeader />
    <main class="page-container">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.app-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: transparent;
}

.page-container {
  flex: 1;
  max-width: 1200px;
  width: 100%;
  margin: var(--header-height) auto 32px;
  padding: 0 var(--space-lg) 48px;
}
</style>
