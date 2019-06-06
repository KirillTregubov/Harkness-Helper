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
  addStudentComment: function(classKey, harknessKey, studentId, comment) {
    const uid = firebase.auth().currentUser.uid
    firebase
      .database()
      .ref('users')
      .child(uid)
      .child('classes')
      .child(classKey)
      .child("harknesses")
      .child(harknessKey)
      .child("students")
      .child(studentId)
      .child("comments")
      .push(comment)
  },
  deleteHarkness: function (classKey, harknessKey) {
    const uid = firebase.auth().currentUser.uid
    firebase
      .database()
      .ref('users')
      .child(uid)
      .child('classes')
      .child(classKey)
      .child("harknesses")
      .child(harknessKey)
      .remove()
  },
  getHarkness: function (classKey, harknessKey, callback){
    const uid = firebase.auth().currentUser.uid;
    firebase
      .database()
      .ref("users")
      .child(uid)
      .child("classes")
      .child(classKey)
      .child("harknesses")
      .child(harknessKey)
      .once("value", callback);
  },
  getClass: function (classKey, callback){
    const uid = firebase.auth().currentUser.uid;
    firebase
      .database()
      .ref("users")
      .child(uid)
      .child("classes")
      .child(classKey)
      .once("value", callback);
  },
  deleteClass: function (classKey) {
    const uid = firebase.auth().currentUser.uid
    firebase
      .database()
      .ref('users')
      .child(uid)
      .child('classes')
      .child(classKey)
      .remove()
  },
  getClasses: function (callback) {
    const uid = firebase.auth().currentUser.uid
    firebase
      .database()
      .ref('users')
      .child(uid)
      .child('classes')
      .once('value', callback)
  },
  getStudents: function (classKey, callback) {
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
  newHarkness: function (classKey, harkness) {
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
  }
}