<template>
<body class="focused" v-if="!isLoading">
  <section class="container">
    <form>
      <div class="title">
        <div class="back" @click="goBack()">
          <Icon name="icon-cheveron-left-circle" size="1.6" />
          <h2>Go Back</h2>
        </div>
        <h1>Create a Harkness Table</h1>
      </div>

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

      <a class="button primary" @click="createHarkness()">Create</a>
    </form>
  </section>
</body>
<body id="loading" v-else>
  <div class="loader">
    <div></div>
  </div>
</body>
</template>

<script>
// import firebase from 'firebase'
import fb from '@/firebase'
import Icon from '@/components/Iconography/Icon.vue'

export default {
  name: 'AddHarkness',
  data () {
    return {
      absentStudents: [],
      students: [],
      harkness: {
        name: '',
        date: '',
        key: '',
        students: [],
        stats: []
      },
      isLoading: true
    }
  },
  props: {
    classKey: {
      type: String,
      default: null
    }
  },
  mounted () {
    if (!this.classKey) this.$router.push('/*')
    fb.getStudents(this.classKey, snapshot => {
      this.isLoading = false
      this.students = snapshot.val()
      this.getDate()
    })
  },
  methods: {
    getDate(){
      let today = new Date()
      var dd = today.getDate();
      if (dd < 10) dd = "0"+ dd
      var mm = today.getMonth()+1; 
      if (mm < 10) mm = "0"+ mm
      var yyyy = today.getFullYear();
      this.harkness.date = yyyy+'-'+mm+'-'+dd
    },
    removeAbsentStudents () {
      this.harkness.students = this.students
      for (let i = 0; i < this.absentStudents.length; i++) {
        let index = this.harkness.students.indexOf(this.absentStudents[i])
        if (index > -1) {
          this.harkness.students.splice(index, 1)
        }
      }
    },
    addAbsent (student) {
      this.absentStudents.push(student)
      console.log(this.absentStudents)
    },
    createHarkness () {
      this.removeAbsentStudents()
      console.log(this.harkness.students)
      fb.newHarkness(this.classKey, this.harkness)
      this.$router.push({ name: 'view-harkness', params: { classKey: this.classKey, harknessKey: this.harkness.key } })
    },
    addStat () {
      this.harkness.stats.push('')
    },
    goBack () {
      window.history.back()
    }
  },
  components: {
    Icon
  }
}
</script>
