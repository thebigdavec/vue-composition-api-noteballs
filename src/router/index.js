import { createRouter, createWebHistory } from 'vue-router'

import Notes from '@/views/Notes.vue'
import EditNote from '@/views/EditNote.vue'
import Stats from '@/views/Stats.vue'

const routes = [
  {
    path: '/',
    name: 'notes',
    component: Notes
  },
  {
    path: '/editnote/:id',
    name: 'edit-note',
    component: EditNote
  },
  {
    path: '/stats',
    name: 'stats',
    component: Stats
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
