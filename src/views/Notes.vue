<script setup>
import { onMounted, ref } from 'vue'
import { useWatchCharacters } from '@/use/useWatchCharacters'
import { useNotesStore } from '@/stores/notesStore'
import Note from '@/components/notes/Note.vue'
import { storeToRefs } from 'pinia'
import NoteForm from '../components/notes/NoteForm.vue'

const notesStore = useNotesStore()
const { notes } = storeToRefs(notesStore)

const newNote = ref('')
const noteForm = ref(null)

const addNote = async () => {
  if (!newNote.value) return

  await notesStore.add({
    title: `Note ${notes.value.length + 1}`,
    content: newNote.value
  })

  newNote.value = ''
  noteForm.value.focusTextArea()
}

onMounted(() => {
  noteForm.value.focusTextArea()
})
</script>
<template>
  <h1>Notes</h1>
  <NoteForm v-model="newNote" ref="noteForm" placeholder="Add a new note">
    Add Note
    <template #buttons>
      <button @click="addNote" :disabled="!newNote" type="submit">
        Add New Note
      </button>
    </template>
  </NoteForm>
  <progress v-if="notesStore.isLoading" />
  <div v-else class="notes">
    <div class="card" v-if="!notes.length">
      <h2>There are no notes.</h2>
      <p>Please add a new note in the area above.</p>
    </div>
    <div v-else class="notes-list">
      <Note v-for="note in notes" :key="note.id" :note="note" />
    </div>
  </div>
</template>
<style scoped>
form {
  margin-block-end: var(--size-6);
}
.notes-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(var(--size-fluid-9), 1fr));
  gap: var(--size-4);
}
progress {
  margin-block-end: var(--size-4);
  width: 100%;
  height: var(--size-2);
}
</style>
