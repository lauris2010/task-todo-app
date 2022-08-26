import * as firebase from 'firebase/app'
import {getFirestore, collection} from 'firebase/firestore'


const clientCredentials = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: "todo-app-4f05f.firebaseapp.com",
    projectId: "todo-app-4f05f",
    storageBucket: "todo-app-4f05f.appspot.com",
    messagingSenderId: "767972521601",
    appId: "1:767972521601:web:93efba36396770d83ebf80"
  };

  firebase.initializeApp(clientCredentials)
  export const db = getFirestore()

  export const colRef = collection(db, 'todos',)
  export const newRef = collection(db, 'todos')

  export default firebase