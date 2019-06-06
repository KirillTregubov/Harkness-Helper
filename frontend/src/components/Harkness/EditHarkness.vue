<template>
<body class="focused">
  <section class="container">
    <form>
      <h1>Edit a Harkness Table</h1>
      
      <label for="harknessName">Harkness Name</label>
      <input type="text" name="harknessName" v-model="harkness.name" placeholder="An Original Harkness Title">
      
      <label for="harknessName">Date Conducted</label>
      <input type="date" name="harknessDate" v-model="harkness.date">

      <!-- to be added later
      <label for="statsAssessed">Skills Assessed</label>
      <div class="iconBeside" :key="stat.id" v-for="stat in harkness.stats">
          <input type="text" name="statName" v-model="stat.title" placeholder="Textual references">
          <input type="text" name="statKica" v-model="stat.kica" placeholder="K">
          <a @click="removeStat(newClass.students.indexOf(student))"><Icon name="icon-remove-circle" size="2" /></a>
          <a @click="addStatl(newClass.students.indexOf(student))"><Icon name="icon-add-circle" size="2" /></a>
      </div> -->

      <label for="absentStudents">Absent Students</label>
      <div class="iconBeside" :key="student.id" v-for="student in students">
        <input type="text" id="studentName" v-model="student.name" placeholder="Kevin DesLauriers">
        <a @click="addAbsent(student)"><Icon name="icon-add-circle" size="2" /></a>
      </div>

      <a class="button primary" @click="editHarkness()">Save Changes</a>
    </form>
  </section>
</body>
</template>

<script>
import firebase from 'firebase'
import Icon from '@/components/Iconography/Icon.vue'

export default {
  name: 'EditHarkness',
  data () {
    return {
      class: ''
    }
  },
  methods: {
    addStudent () {
      this.students.push('')
    }
  },
  mounted () {
    const uid = firebase.auth().currentUser.uid
    firebase
      .database()
      .ref('users')
      .child(uid)
      .child('classes')
      .child(this.selectedClass) // Vue says this is undefined
      .child('students')
      .once('value', snapshot => {
        this.isLoading = false
        this.students = snapshot.val()
      })
  },
  components: {
    Icon
  }
}
</script>
