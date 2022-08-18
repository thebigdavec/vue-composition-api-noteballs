import { createRouter, createWebHistory } from 'vue-router'

// @ts-ignore
import Notes from '@/views/Notes.vue'
// @ts-ignore
import EditNote from '@/views/EditNote.vue'
// @ts-ignore
import Stats from '@/views/Stats.vue'
// @ts-ignore
import Auth from '@/views/Auth.vue'

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
  },
  {
    path: '/auth',
    name: 'auth',
    component: Auth
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
