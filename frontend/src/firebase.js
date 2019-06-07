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

export default {
  getUserData (callback) {
    const uid = firebase.auth().currentUser.uid
    firebase
      .database()
      .ref('users')
      .child(uid)
      .once('value', callback)
  },
  updateHarknessStudents (classKey, harknessKey, newStudents) {
    const uid = firebase.auth().currentUser.uid
    firebase
      .database()
      .ref('users')
      .child(uid)
      .child('classes')
      .child(classKey)
      .child('harknesses')
      .child(harknessKey)
      .child('students')
      .set(newStudents)
  },
  addUser (uid, userData) {
    firebase.database().ref('users').child(uid).set(userData)
  },
  getSchools (callback) {
    firebase.database().ref('schools').once('value', callback)
  },
  addStudentComment (classKey, harknessKey, studentId, comment) {
    const uid = firebase.auth().currentUser.uid
    firebase
      .database()
      .ref('users')
      .child(uid)
      .child('classes')
      .child(classKey)
      .child('harknesses')
      .child(harknessKey)
      .child('students')
      .child(studentId)
      .child('comments')
      .push(comment)
  },
  deleteHarkness (classKey, harknessKey) {
    const uid = firebase.auth().currentUser.uid
    firebase
      .database()
      .ref('users')
      .child(uid)
      .child('classes')
      .child(classKey)
      .child('harknesses')
      .child(harknessKey)
      .remove()
  },
  getHarkness (classKey, harknessKey, callback) {
    const uid = firebase.auth().currentUser.uid
    firebase
      .database()
      .ref('users')
      .child(uid)
      .child('classes')
      .child(classKey)
      .child('harknesses')
      .child(harknessKey)
      .once('value', callback)
  },
  newClass (newClass) {
    const uid = firebase.auth().currentUser.uid
    const ref = firebase.database().ref('users').child(uid).child('classes')
    const classKey = ref.push().getKey()
    newClass.key = classKey
    ref.child(classKey).set(newClass)
  },
  updateClass (classKey, newClass) {
    const uid = firebase.auth().currentUser.uid
    firebase
      .database()
      .ref('users')
      .child(uid)
      .child('classes')
      .child(classKey)
      .set(newClass)
  },
  updateHarkness (classKey, harknessKey, newHarkness) {
    const uid = firebase.auth().currentUser.uid
    firebase
      .database()
      .ref('users')
      .child(uid)
      .child('classes')
      .child(classKey)
      .child('harknesses')
      .child(harknessKey)
      .set(newHarkness)
  },
  getClass (classKey, callback) {
    const uid = firebase.auth().currentUser.uid
    firebase
      .database()
      .ref('users')
      .child(uid)
      .child('classes')
      .child(classKey)
      .once('value', callback)
  },
  deleteClass (classKey) {
    const uid = firebase.auth().currentUser.uid
    firebase
      .database()
      .ref('users')
      .child(uid)
      .child('classes')
      .child(classKey)
      .remove()
  },
  getClasses (callback) {
    const uid = firebase.auth().currentUser.uid
    firebase
      .database()
      .ref('users')
      .child(uid)
      .child('classes')
      .once('value', callback)
  },
  getStudents (classKey, callback) {
    const uid = firebase.auth().currentUser.uid
    firebase
      .database()
      .ref('users')
      .child(uid)
      .child('classes')
      .child(classKey)
      .child('students')
      .once('value', callback)
  },
  newHarkness (classKey, harkness) {
    const uid = firebase.auth().currentUser.uid
    const ref = firebase
      .database()
      .ref('users')
      .child(uid)
      .child('classes')
      .child(classKey)
      .child('harknesses')
    harkness.key = ref.push().getKey()
    ref.child(harkness.key).set(harkness)
    return harkness.key
  },
  logout () {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.$router.go('')
      })
  }
}
