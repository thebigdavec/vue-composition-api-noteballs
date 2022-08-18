<script setup>
const logout = () => {
  console.log('Log out')
}
</script>

<template>
  <nav role="navigation" aria-label="main navigation">
    <RouterLink :to="{ name: 'notes' }">Notes</RouterLink>
    <RouterLink :to="{ name: 'stats' }">Stats</RouterLink>
    <RouterLink :to="{ name: 'auth' }">Login</RouterLink>
    <button @click="logout" class="link-btn">Logout</button>
  </nav>
</template>

<style scoped>
nav {
  display: flex;
  align-items: center;
  gap: var(--size-4);
}
nav a {
  color: var(--blue-3);
  text-shadow: 2px 2px 0 black;
  transition: color 0.5s ease-out;
}
nav a:hover,
nav a:focus-visible {
  color: var(--blue-1);
  transition: color 100ms ease-in;
}
nav .router-link-active {
  color: var(--gray-3);
}
nav .router-link-exact-active {
  color: var(--gray-2);
}
button {
  text-shadow: 2px 2px 0 black;
  color: var(--blue-3);
}
</style>
