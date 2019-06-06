<template>
<body class="focused">
  <section class="container">
    <form>
      <h1>Create a Class</h1>
      <label for="className">Class Name</label>
      <input type="text" name="className" v-model="newClass.name" placeholder="Computer Science">

      <label for="courseCode">Course Code</label>
      <input type="text" name="courseCode" v-model="newClass.courseCode" placeholder="ICS4Ua">

      <label for="year">Academic Year</label>
      <input type="text" name="year" v-model="newClass.year" placeholder="2019-2020">

      <label for="block">Block</label>
      <input type="number" name="block" v-model="newClass.block" min="1" max="8" placeholder="1">

      <label for="students">Students</label>
      <!-- one name per box : validation -->
      <div class="iconBeside" :key="student.id" v-for="student in newClass.students">
        <input type="text" name="student" v-model="student.name" placeholder="John Doe">
        <!-- prohibit deleting last student : validation -->
        <a @click="removeStudent(newClass.students.indexOf(student))"><Icon name="icon-remove-circle" size="2" /></a>
        <a @click="addStudent(newClass.students.indexOf(student))"><Icon name="icon-add-circle" size="2" /></a>
      </div>
      
      <a class="button primary" @click="createClass()">Create</a>
    </form>
  </section>
</body>
</template>

<script>
import firebase from 'firebase'
import Icon from '@/components/Iconography/Icon.vue'

export default {
  name: 'AddClass',
  data () {
    return {
      newClass: {
        name: '',
        courseCode: '',
        block: '',
        year: '',
        students: [{name: ''}]
      }
    }
  },
  methods: {
    createClass () {
      const uid = firebase.auth().currentUser.uid
      const ref = firebase.database().ref('users').child(uid).child('classes')
      const classKey = ref.push().getKey()
      ref.child(classKey).set({
        key: classKey,
        name: this.newClass.name,
        classCode: this.newClass.courseCode,
        block: this.newClass.block,
        students: this.newClass.students
      })
      this.$router.push('/dashboard')
    },
    addStudent (val) {
      this.newClass.students.splice( val + 1, 0, {
        'name': ''
      })
    },
    removeStudent (val) {
      this.newClass.students.splice(val, 1)
    }
  },
  components: {
    Icon
  }
}
</script>
