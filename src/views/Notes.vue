<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useNotesStore } from '@/stores/notesStore'
import { storeToRefs } from 'pinia'

import Note from '@/components/notes/Note.vue'
import NoteForm from '@/components/notes/NoteForm.vue'

const authStore = useAuthStore()

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
</script>
<template>
  <h1>Notes</h1>
  <NoteForm
    v-model="newNote"
    ref="noteForm"
    class="card container-inner"
    placeholder="Add a new note"
  >
    Add Note
    <template #buttons>
      <button @click="addNote" :disabled="!newNote" type="submit">
        Add New Note
      </button>
    </template>
  </NoteForm>
  <div v-if="authStore.user.isLoggedIn && notesStore.isLoading">
    Is Loading
    <div>
      <progress />
    </div>
  </div>
  <div v-else-if="authStore.user.isLoggedIn" class="notes container-inner">
    <div class="card" v-if="!notes.length">
      <h2>There are no notes.</h2>
      <p>Please add a new note in the area above.</p>
    </div>
    <div v-else class="notes-list">
      <Note v-for="note in notes" :key="note.id" :note="note" />
    </div>
  </div>
  <div v-else class="notes container-inner">
    <div class="card">
      <h2>You are not logged in.</h2>
      <p>Please log in to view your notes.</p>
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
