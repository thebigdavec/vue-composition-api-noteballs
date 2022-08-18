// @ts-nocheck
import { defineStore } from 'pinia'
import { reactive, onMounted } from 'vue'
import { auth } from '@/js/firebase'
import {
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithEmailAndPassword
} from 'firebase/auth'
import { useNotesStore } from '@/stores/notesStore'

export const useAuthStore = defineStore('auth', () => {
  const user = reactive({
    uid: '',
    current: '',
    isLoggedIn: false
  })

  async function registerUser(credentials) {
    console.log('Attempting registration...')
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      )
      user.uid = userCredential.user.uid
      user.current = userCredential.user
      console.log('User successfully registered!', { user: user.current })
    } catch (error) {
      console.error('Registration failed.', error.message)
    }
  }

  async function login(credentials) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      )
      user.uid = userCredential.user.uid
      user.current = userCredential.user
    } catch (error) {
      console.error('Login failed.', error.message)
    }
  }

  async function logout() {
    await signOut(auth)
  }

  onMounted(() => {
    onAuthStateChanged(auth, theUser => {
      const notesStore = useNotesStore()
      if (theUser) {
        user.uid = theUser.uid
        user.current = theUser.user
        user.isLoggedIn = true
        notesStore.init()
      } else {
        user.uid = null
        user.current = null
        user.isLoggedIn = false
        notesStore.clear()
      }
    })
  })

  return { user, registerUser, login, logout }
})
