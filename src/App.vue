<script setup>
import Header from '@/components/layout/Header.vue'
import Footer from '@/components/layout/Footer.vue'
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
