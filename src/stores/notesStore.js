// @ts-nocheck
import { defineStore } from 'pinia'
import {
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  collection,
  query,
  onSnapshot,
  orderBy,
  Timestamp
} from 'firebase/firestore'

import { db } from '@/js/firebase'
import { useAuthStore } from '@/stores/authStore'

let notesCollection
let q

let unSubscribe

export const useNotesStore = defineStore('notes', {
  state: () => {
    return {
      notes: [],
      isLoading: true
    }
  },
  getters: {
    getNote: state => id => state.notes.find(note => note.id === id),
    notesCount: state => state.notes.length,
    totalCharacterCount: state =>
      state.notes.reduce((count, note) => count + note.content.length, 0)
  },
  actions: {
    init() {
      const authStore = useAuthStore()
      if (authStore.user.isLoggedIn) {
        notesCollection = collection(db, 'users', authStore.user.uid, 'notes')
        q = query(notesCollection, orderBy('createdAt', 'desc'))

        this.fetch()
      } else {
        this.state.notes = []
        this.state.isLoading = false
        unSubscribe()
      }
    },
    fetch() {
      if (unSubscribe) unSubscribe()
      unSubscribe = onSnapshot(
        q,
        querySnapshot => {
          this.notes = []
          querySnapshot.forEach(note =>
            this.notes.push({
              ...note.data(),
              id: note.id
            })
          )
          this.isLoading = false
        },
        error => {
          console.error(error.message)
        }
      )
    },
    clear() {
      this.notes = []
    },
    async add(note) {
      await addDoc(notesCollection, {
        title: note.title,
        content: note.content,
        createdAt: Timestamp.fromDate(new Date())
      })
    },
    async remove(id) {
      await deleteDoc(doc(notesCollection, id))
    },
    async update(note) {
      const id = note.id

      await updateDoc(doc(notesCollection, id), {
        content: note.content,
        title: note.title,
        updatedAt: Timestamp.fromDate(new Date())
      })
    }
  }
})
