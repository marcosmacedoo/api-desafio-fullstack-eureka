import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore/lite'
import { firebaseConfig } from './config/firebaseConfig'

const firebaseApp = initializeApp(firebaseConfig)
const database = getFirestore(firebaseApp)

export { database }
