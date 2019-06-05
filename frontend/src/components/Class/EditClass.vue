<template>
<body>
  <form>
    <h1>Edit Your Class</h1>
    <p>Class name:</p>
    <input
      v-model="selectedClass.name"
      type="text"
      name="className"
      v-bind="selectedClass.name"
      required
    >
    <p>Course code:</p>
    <input
      v-model="selectedClass.courseCode"
      type="text"
      name="courseCode"
      v-bind="selectedClass.courseCode"
      required
    >
    <p>Year:</p>
    <p>
      <input v-model="selectedClass.year" type="text" name="year" v-bind="selectedClass.year" required>
    </p>
    <p>Block:</p>
    <input
      v-model="selectedClass.block"
      type="number"
      min="1"
      max="8"
      name="block"
      v-bind="selectedClass.block"
      required
    >
    <p>Students (please enter names one per box):</p>
    <div :key="student.id" v-for="student in studentsArray">
      <input type="text" name="student" v-model="student.name" placeholder="Kevin DesLauriers">
    </div>
    <a class="button" @click="addStudent()">Add Student</a>
  </form>
  <button @click="editClass()">Save Changes</button>
</body>
</template>

<script>
import firebase from 'firebase'

export default {
  data: function () {
    return {
      selectedClass: ''
    }
  },
  methods: {
    addStudent: function () {
      this.studentsArray.push('')
    }
  },
  props: {
    classKey: {
      type: String,
      default: null
    }
  },
  mounted: function () {
    const uid = firebase.auth().currentUser.uid
    firebase
      .database()
      .ref('users')
      .child(uid)
      .child('classes')
      .child(this.selectedClass) // Vue says this is undefined
      .once('value', snapshot => {
        this.isLoading = false
        this.selectedClass = snapshot.val()
      })
    /*
    console.log(this.classes.length)
    if (this.classes.length > 0) {
      this.selectedClass = this.classes[0]
      console.log('sec')
    }
    firebase () {
    const uid = firebase.auth().currentUser.uid
    return {
      classes: db
        .ref('users')
        .child(uid)
        .child('classes')

    }
    */
  }
}
</script>
