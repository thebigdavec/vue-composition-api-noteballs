<script setup></script>
<template>
  <footer class="container">
    <div class="brand">Noteballs</div>
    <div class="copyright">
      <a href="https://davecollison.dev" target="blank">
        &copy; 2022 Dave Collison
      </a>
    </div>
    <a href="#">^ TOP</a>
  </footer>
</template>

<style scoped>
footer.container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--size-6);
  background-image: var(--gradient-2);
  padding: var(--size-6) var(--size-fluid-6);
  text-shadow: 0 1px 1px black;
  font-size: var(--size-4);
}
.brand {
  font-family: var(--font-mono);
}
</style>
