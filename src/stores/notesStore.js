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

const notesCollection = collection(db, 'notes')
const q = query(notesCollection, orderBy('createdAt', 'desc'))

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
    fetch() {
      const unSubscribe = onSnapshot(q, querySnapshot => {
        this.notes = []
        querySnapshot.forEach(note =>
          this.notes.push({
            ...note.data(),
            id: note.id
          })
        )
        this.isLoading = false
      })
      return unSubscribe
    },

    async add(note) {
      await addDoc(notesCollection, {
        ...note,
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
