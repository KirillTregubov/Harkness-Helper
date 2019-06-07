<template>
  <body class="focused" v-if="!isLoading">
    <section class="container harkness">
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
          <a class="button primary" @click="saveChanges()"><Icon name="icon-check" />Save Changes</a>
          <a class="button destructive" @click="deleteHarkness()"><Icon name="icon-trash" />Delete Harkness</a>
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
import fb from '@/firebase'
import { mapGetters, mapActions } from 'vuex'
import Multiselect from 'vue-multiselect';
import Icon from '@/components/Iconography/Icon.vue'

export default {
  name: 'EditHarkness',
  data () {
    return {
      absentStudents: [],
      students: [],
      harkness: null,
      nameError: false,
      dateError: false,
      studentsError: false,
      isLoading: true
    }
  },
  computed: {
    ...mapGetters([
      'getClassKey',
      'getHarknessKey'
    ])
  },
  methods: {
    saveChanges () {
      this.removeAbsentStudents()

      if (!this.harkness.name) this.nameError = true
      else this.nameError = false

      if (!this.harkness.date || !this.validateDate()) this.dateError = true
      else this.dateError = false

      if (this.harkness.students.length === 0) this.studentsError = true
      else this.studentsError = false

      if (!this.nameError && !this.dateError && !this.studentsError) {
        fb.updateHarkness(this.getClassKey, this.getHarknessKey, this.harkness)
        window.history.back()
      }
    },
    deleteHarkness() {
      fb.deleteHarkness(this.getClassKey, this.getHarknessKey)
      this.$router.push('/dashboard')
    },
    removeAbsentStudents() {
      if (this.absentStudents.length > 0) {
        this.harkness.students = this.students.filter(student => !this.absentStudents.includes(student)).map(student => ({ "name": student}))
      } else {
        this.harkness.students = this.students.map(student => ({ "name": student }))
      }
    },
    validateDate: function() {
      var re = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/
      return re.test(this.harkness.date)
    },
    goBack () {
      window.history.back()
    }
  },
  mounted () {
    if (!this.getClassKey || !this.getHarknessKey) this.$router.push('/*')

    fb.getHarkness(this.getClassKey, this.getHarknessKey, snapshot => {
      this.isLoading = false
      this.harkness = snapshot.val()
      this.students = this.harkness.students.map(student => student.name)
    })
  },
  components: {
    Multiselect,
    Icon
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
