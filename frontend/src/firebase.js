import firebase from 'firebase' // change

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyBH9uQ6Nx-pYS0HcLrVtkWMigIzyKVWBjk',
  authDomain: 'harknesshelper-73eee.firebaseapp.com',
  databaseURL: 'https://harknesshelper-73eee.firebaseio.com',
  projectId: 'harknesshelper-73eee',
  storageBucket: 'harknesshelper-73eee.appspot.com',
  messagingSenderId: '441754376048',
  appId: '1:441754376048:web:0ef48ceb8178da6b'
})

export const db = firebaseApp.database()
