import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: 'AIzaSyA8y_2SKKzQI7ZNmp1yRZMilQTUEms4j6M',
    authDomain: 'davedev-noteballs.firebaseapp.com',
    projectId: 'davedev-noteballs',
    storageBucket: 'davedev-noteballs.appspot.com',
    messagingSenderId: '432805033532',
    appId: '1:432805033532:web:dd10ef596cf53e3a37b539'
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export { db }