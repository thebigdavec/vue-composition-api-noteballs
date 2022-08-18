<script setup>
import Navbar from './Navbar.vue'
</script>

<template>
  <header class="container">
    <div class="brand">Noteballs</div>
    <Navbar />
  </header>
</template>

<style scoped>
header.container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--size-6);
  background-image: var(--gradient-2);
  padding: var(--size-6) var(--size-fluid-4);
  text-shadow: 0 1px 1px black;
  font-size: var(--size-4);
}
.brand {
  font-family: var(--font-mono);
}
</style>
