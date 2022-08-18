// @ts-nocheck
import { createRouter, createWebHashHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

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
  history: createWebHashHistory(),
  routes
})

router.beforeEach(async (to, from) => {
  const authStore = useAuthStore()
  if (!authStore.user.isLoggedIn && to.name !== 'auth') {
    return { name: 'auth' }
  }
  if (authStore.user.isLoggedIn && to.name === 'auth') {
    return false
  }
})

export default router
