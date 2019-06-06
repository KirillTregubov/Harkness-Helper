<template>
<body class="focused" v-if="!isLoading">
  <section class="container">
    <form>
      <div class="title">
        <div class="back" @click="goBack()">
          <Icon name="icon-cheveron-left-circle" size="1.6" />
          <h2>Go Back</h2>
        </div>
        <h1>Edit a Harkness Table</h1>
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
      <div class="iconBeside" :key="student.id" v-for="student in harkness.students">
        <input type="text" id="studentName" v-model="student.name" placeholder="Kevin DesLauriers">
        <a @click="addAbsent(student)"><Icon name="icon-add-circle" size="2" /></a>
      </div>

      <a class="button primary" @click="saveChanges()">Save Changes</a>
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
import fb from '@/firebase'
import Icon from '@/components/Iconography/Icon.vue'

export default {
  name: 'EditHarkness',
  data () {
    return {
      harkness: '',
      isLoading: true
    }
  },
  props: {
    classKey: {
      type: String,
      default: null
    },
    harknessKey: {
      type: String,
      default: null
    }
  },
  methods: {
    saveChanges () {
      fb.updateHarkness(this.classKey, this.harknessKey, this.harkness)
    },
    addStudent () {
      this.students.push('')
    },
    goBack () {
      window.history.back()
    }
  },
  mounted () {
    if (!this.classKey || !this.harknessKey) this.$router.push('/*')
    fb.getHarkness(this.classKey, this.harknessKey, snapshot => {
      this.isLoading = false
      this.harkness = snapshot.val()
    })
  },
  components: {
    Icon
  }
}
</script>
