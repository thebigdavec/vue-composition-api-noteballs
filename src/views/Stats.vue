<script setup>
import { useNotesStore } from '../stores/notesStore'

const notesStore = useNotesStore()
</script>

<template>
  <h1>Stats</h1>
  <div class="card stats">
    <div class="stats-header stat">
      <h2>Statistic</h2>
      <h2>Value</h2>
    </div>
    <div class="stat">
      <h3>Notes</h3>
      <p>{{ notesStore.notesCount }}</p>
    </div>
    <div class="stat">
      <h3>Character count</h3>
      <p>{{ notesStore.totalCharacterCount }}</p>
    </div>
  </div>
</template>

<style scoped>
.stats {
  display: grid;
  gap: var(--size-4);
  max-width: calc(var(--size-fluid-9) * 2);
  margin-inline: auto;
}
.stat {
  display: flex;
  justify-content: space-between;
}
.stat h3 {
  font-weight: 400;
}
.stat p {
  font-size: var(--size-6);
}
.stats-header {
  padding-block-end: var(--size-4);
  border-block-end: var(--border-size-2) solid var(--gray-1);
}
input {
  width: 100%;
  margin-block-start: var(--size-8);
}
</style>
