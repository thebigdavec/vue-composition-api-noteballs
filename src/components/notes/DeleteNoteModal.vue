<script setup>
import { ref } from 'vue'
import { onClickOutside, onKeyStroke } from '@vueuse/core'
import { useNotesStore } from '@/stores/notesStore'
import { vAutofocus } from '@/directives/vAutofocus'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  noteId: {
    type: String,
    required: true
  }
})

const { remove } = useNotesStore()
const dialog = ref()
const emit = defineEmits(['update:modelValue'])

const closeModal = () => {
  emit('update:modelValue', false)
}

onClickOutside(dialog, closeModal)
onKeyStroke('Escape', closeModal)
</script>

<template>
  <Teleport to="body">
    <dialog ref="dialog" :open="modelValue" class="modal">
      <button @click="closeModal" class="x">x</button>
      <header class="card-header">
        <h2>Delete Note</h2>
      </header>
      <section class="card-body">
        <p>Are you sure you want to delete this note?</p>
      </section>
      <footer class="card-actions">
        <button @click="closeModal" v-autofocus>Cancel</button>
        <button @click="remove(noteId)" class="danger">Delete</button>
      </footer>
    </dialog>
  </Teleport>
</template>

<style scoped>
dialog {
  position: fixed;
  padding: var(--size-5) var(--size-7);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0;
}
.card-header {
  margin-block-end: var(--size-4);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
dialog button.x {
  position: absolute;
  top: var(--size-4);
  right: var(--size-4);
  border-radius: var(--radius-round);
  aspect-ratio: 1;
  padding: var(--size-2);
  line-height: 0;
  color: var(--gray-4);
  transition: color 0.5s ease-out;
}
.card-header button:hover,
.card-header button:focus-visible {
  color: var(--gray-1);
  transition: color 100ms ease-in;
}
.card-actions {
  margin-block-start: var(--size-4);
  justify-content: flex-end;
  display: flex;
  gap: var(--size-2);
}
</style>
