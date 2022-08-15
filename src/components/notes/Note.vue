<script setup>
import { ref, computed, reactive, onMounted } from 'vue'
import { useDateFormat, useTimeAgo } from '@vueuse/core'
import { useNotesStore } from '@/stores/notesStore'
import DeleteNoteModal from './DeleteNoteModal.vue'

const notesStore = useNotesStore()

const { note } = defineProps({
  note: {
    type: Object,
    required: true
  }
})

const noteDate = useDateFormat(note.createdAt.toDate(), 'DD/MM/YYYY')
const timeAgo = useTimeAgo(note.createdAt.toDate())

const noteLengthText = computed(
  () => `${note.content.length} character${note.content.length > 1 ? 's' : ''}`
)

const modals = reactive({
  isDeleteModalVisible: false
})
</script>

<template>
  <div class="card">
    <div class="card-content">
      <p>
        {{ note.content }}
      </p>
      <div class="card-content-note"></div>
      <div class="flex-between">
        <small>{{ noteDate }} - {{ timeAgo }}</small>
        <small>{{ noteLengthText }}</small>
      </div>
    </div>
    <div class="card-actions">
      <RouterLink
        :to="{
          name: 'edit-note',
          params: {
            id: note.id
          }
        }"
      >
        Edit
      </RouterLink>
      <button @click="modals.isDeleteModalVisible = true" class="danger">
        Delete
      </button>
    </div>
    <DeleteNoteModal
      v-if="modals.isDeleteModalVisible"
      v-model="modals.isDeleteModalVisible"
      :noteId="note.id"
    />
  </div>
</template>

<style scoped>
.card {
  display: grid;
  gap: var(--size-5);
}
.card-content {
  display: grid;
  gap: var(--size-4);
}
.card-content-note {
  justify-self: right;
  color: var(--gray-5);
}
.card-actions {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: var(--size-4);
}
.flex-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
small {
  max-inline-size: 100%;
}
</style>
