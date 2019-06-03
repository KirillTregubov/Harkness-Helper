<template>
<body>
  <form>
    <h1>Add a New Class</h1>
    <p>Class name:</p>
    <input v-model="newClass.name" type="text" name="className" placeholder="Computer Science" required>
    <p>Course code:</p>
    <input v-model="newClass.courseCode" type="text" name="courseCode" placeholder="ICS4U-A" required>
    <p>Year:</p>
    <p>
      <input v-model="newClass.year" type="text" name="year" placeholder="2018-2019" required>
    </p>
    <p>Block:</p>
    <input v-model="newClass.block" type="number" min="1" max="8" name="block" placeholder="2" required>
    <p>Students (please enter names one per box): </p>
    <div :key="student.id" v-for="student in newClass.studentsArray">
      <input type="text" name="student" v-model="student.name" placeholder="Kevin DesLauriers">
    </div>
    <a class="button" @click="addStudent()">Add Student</a>
  </form>
  <button @click="addClass()">Submit</button>
</body>
</template>

<script>
import firebase from 'firebase'
export default {
  data: function () {
    return {
      newClass: {
        name: '',
        courseCode: '',
        block: '',
        year: '',
        studentsArray: []
      },
    }
  },
  methods: {
    addClass: function () {
      const uid = firebase.auth().currentUser.uid
      const ref = firebase.database().ref('users').child(uid).child('classes')
      const classKey = ref.push().getKey()
      ref.child(classKey).set({
        key: classKey,
        block: this.newClass.block,
        classCode: this.newClass.courseCode,
        harknesses: [],
        name: this.newClass.name,
        harknesses: [],
        stats: [
          {
            classScore: 4,
            kica: 'A',
            title: 'knowledge'
          },
          {
            classScore: 3,
            kica: 'T',
            title: 'thinking'
          }
        ],
        students: this.newClass.studentsArray
      })
      this.$router.push('/dashboard')
    },
    addStudent: function () {
      this.newClass.studentsArray.push({
        "name": "student name",
        "picture": "random url"
      })
    }
  }
}
</script>
