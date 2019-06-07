<template>
  <body class="focused" v-if="!isLoading">
    <section class="container harkness">
      <form>
        <div class="title">
          <div class="back" @click="goBack()">
            <Icon name="icon-cheveron-left-circle" size="1.6" />
            <h2>Go Back</h2>
          </div>
          <h1>Create a Harkness Table</h1>
        </div>

        <label for="harknessName">Harkness Title</label>
        <input type="text" name="harknessName" v-model="harkness.name" placeholder="An Original Harkness Title">
        <h5 class="error" :class="{ active: nameError }">A title is required.</h5>

        <label for="harknessName">Date Conducted</label>
        <input type="date" name="harknessDate" v-model="harkness.date">
        <h5 class="error" :class="{ active: dateError }">A valid date is required.</h5>

        <!-- to be added later
          <label for="statsAssessed">Skills Assessed</label>
          <div class="iconBeside" :key="stat.id" v-for="stat in harkness.stats">
              <input type="text" name="statName" v-model="stat.title" placeholder="Textual references">
              <input type="text" name="statKica" v-model="stat.kica" placeholder="K">
              <a @click="removeStat(newClass.students.indexOf(student))"><Icon name="icon-remove-circle" size="2" /></a>
              <a @click="addStatl(newClass.students.indexOf(student))"><Icon name="icon-add-circle" size="2" /></a>
        </div> -->

        <label for="absentStudents">Absent Students</label>
        <multiselect v-model="absentStudents" :options="students" :multiple="true"></multiselect>
        <h5 class="error" :class="{ active: studentsError }">At least one present student is required.</h5>

        <div class="buttons">
          <a class="button primary" @click="createHarkness()"><Icon name="icon-check" />Create</a>
        </div>
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
import { mapGetters, mapActions } from 'vuex'
import Multiselect from 'vue-multiselect'
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
      nameError: false,
      dateError: false,
      studentsError: false,
      isLoading: true
    }
  },
  computed: {
    ...mapGetters(['getClassKey', 'getHarknessKey'])
  },
  mounted () {
    if (!this.getClassKey) this.$router.push('/*')
    fb.getStudents(this.getClassKey, snapshot => {
      this.isLoading = false
      this.students = snapshot.val().map(student => student.name)
      this.getDate()
    })
  },
  methods: {
    removeAbsentStudents () {
      if (this.absentStudents.length > 0) {
        this.harkness.students = this.students.filter(student => !this.absentStudents.includes(student)).map(student => ({ 'name': student }))
      } else {
        this.harkness.students = this.students.map(student => ({ 'name': student }))
      }
    },
    createHarkness () {
      this.removeAbsentStudents()

      if (!this.harkness.name) this.nameError = true
      else this.nameError = false

      if (!this.harkness.date || !this.validateDate()) this.dateError = true
      else this.dateError = false

      if (this.harkness.students.length === 0) this.studentsError = true
      else this.studentsError = false

      if (!this.nameError && !this.dateError && !this.studentsError) {
        let harknessKey = fb.newHarkness(this.getClassKey, this.harkness)
        this.setHarknessKey(harknessKey)
        this.$router.push('/view/harkness')
      }
    },
    getDate () {
      let today = new Date()
      var dd = today.getDate()
      if (dd < 10) dd = '0' + dd
      var mm = today.getMonth() + 1
      if (mm < 10) mm = '0' + mm
      var yyyy = today.getFullYear()
      this.harkness.date = yyyy + '-' + mm + '-' + dd
    },
    addStat () {
      this.harkness.stats.push('')
    },
    validateDate: function () {
      var re = /^\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$/
      return re.test(this.harkness.date)
    },
    goBack () {
      window.history.back()
    },
    ...mapActions(['setHarknessKey'])
  },
  components: {
    Multiselect,
    Icon
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
