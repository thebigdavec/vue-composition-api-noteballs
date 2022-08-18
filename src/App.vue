<script setup>
import { onBeforeMount } from 'vue'
import Header from '@/components/layout/Header.vue'
import Footer from '@/components/layout/Footer.vue'

import { useAuthStore } from '@/stores/authStore'
const authStore = useAuthStore()
onBeforeMount(async () => {
  await authStore.init()
})
</script>

<template>
  <Header />
  <div class="container">
    <RouterView />
  </div>
  <Footer />
</template>

<style>
#app {
  display: grid;
  grid-template-rows: auto 1fr auto;
}
.container {
  min-height: 100%;
}
</style>
