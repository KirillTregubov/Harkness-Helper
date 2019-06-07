<template>
  <body class="focused" v-if="!isLoading">
    <section class="container">
      <form>
        <div class="title">
          <div class="back" @click="goBack()">
            <Icon name="icon-cheveron-left-circle" size="1.6" />
            <h2>Go Back</h2>
          </div>
          <h1>Edit a Class</h1>
        </div>

        <label for="className">Class Name</label>
        <input type="text" name="className" v-model="selectedClass.name">
        <h5 class="error" :class="{ active: nameError }">A name is required.</h5>

        <label for="courseCode">Course Code</label>
        <input type="text" name="courseCode" v-model="selectedClass.courseCode">
        <h5 class="error" :class="{ active: codeError }">A course code is required.</h5>

        <label for="year">Academic Year</label>
        <input type="text" name="year" v-model="selectedClass.year">
        <h5 class="error" :class="{ active: yearError }">An academic year is required.</h5>

        <label for="block">Block (optional)</label>
        <input type="number" name="block" v-model="selectedClass.block" min="1" max="8" placeholder="1">

        <label for="students">Students</label>
        <!-- one name per box : validation -->
        <div class="iconBeside" :key="student.id" v-for="student in selectedClass.students">
          <input type="text" name="student" v-model="student.name">
          <!-- prohibit deleting last student : validation -->
          <a @click="removeStudent(selectedClass.students.indexOf(student))"><Icon name="icon-remove-circle" size="2" /></a>
          <a @click="addStudent(selectedClass.students.indexOf(student))"><Icon name="icon-add-circle" size="2" /></a>
        </div>
        <h5 class="error" :class="{ active: studentsError }">At least one student is required.</h5>

        <div class="buttons">
          <a class="button primary" @click="saveChanges()"><Icon name="icon-check" />Save Changes</a>
          <a class="button destructive" @click="deleteClass()"><Icon name="icon-trash" />Delete Class</a>
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
import Icon from '@/components/Iconography/Icon.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'EditClass',
  data () {
    return {
      selectedClass: '',
      nameError: false,
      codeError: false,
      yearError: false,
      studentsError: false,
      isLoading: true
    }
  },
  computed: {
    ...mapGetters([
      'getClassKey'
    ])
  },
  methods: {
    saveChanges () {
      this.filterEmpty()

      if (!this.selectedClass.name) this.nameError = true
      else this.nameError = false

      if (!this.selectedClass.courseCode) this.codeError = true
      else this.codeError = false

      if (!this.selectedClass.year) this.yearError = true
      else this.yearError = false

      if (this.selectedClass.students[0].name === '') this.studentsError = true
      else this.studentsError = false

      if (!this.nameError && !this.codeError && !this.yearError && !this.studentsError) {
        fb.updateClass(this.getClassKey, this.selectedClass)
        window.history.back()
      }
    },
    filterEmpty () {
      for (let i = 0; i < this.selectedClass.students.length; i++) {
        let student = this.selectedClass.students[i]
        if (student.name === '') {
          this.selectedClass.students.splice(i, 1)
          i--
        }
      }
    },
    addStudent (val) {
      this.studentsError = false
      this.selectedClass.students.splice(val + 1, 0, {
        'name': ''
      })
    },
    removeStudent (val) {
      if (this.selectedClass.students.length > 1) { this.selectedClass.students.splice(val, 1) } else this.studentsError = true
    },
    deleteClass () {
      fb.deleteClass(this.getClassKey)
      this.$router.push('/dashboard')
    },
    goBack () {
      window.history.back()
    }
  },
  mounted () {
    if (!this.getClassKey) this.$router.push('/*')

    fb.getClass(this.getClassKey, snapshot => {
      this.isLoading = false
      this.selectedClass = snapshot.val()
    })
  },
  components: {
    Icon
  }
}
</script>
