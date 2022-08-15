<script setup>
import { onMounted, ref } from 'vue'
import { useNotesStore } from '../stores/notesStore'
import { useRoute, useRouter } from 'vue-router'
import NoteForm from '@/components/notes/NoteForm.vue'

const notesStore = useNotesStore()
const route = useRoute()
const router = useRouter()

const note = ref(notesStore.getNote(route.params.id))

const noteForm = ref(null)
const noteContent = ref('')

noteContent.value = note.value.content

const updateNote = () => {
  notesStore.update({
    ...note.value,
    content: noteContent.value
  })
  router.back()
}

onMounted(() => {
  noteForm.value.focusTextArea()
})
</script>

<template>
  <h1>Notes</h1>

  <div class="edit-note">
    <NoteForm
      v-model="noteContent"
      ref="noteForm"
      placeholder="Enter updated content"
    >
      Update Note
      <template #buttons>
        <button @click="$router.back()">Cancel</button>
        <button @click="updateNote" :disabled="!noteContent" type="submit">
          Update Note
        </button>
      </template>
    </NoteForm>
  </div>
</template>

<style scoped></style>
