<template>
  <body class="focused">
    <section class="container">
      <form>
        <div class="title">
          <div class="back" @click="goBack()">
            <Icon name="icon-cheveron-left-circle" size="1.6" />
            <h2>Go Back</h2>
          </div>
          <h1>Create a Class</h1>
        </div>

        <label for="className">Class Name</label>
        <input type="text" name="className" v-model="newClass.name" placeholder="Computer Science">
        <h5 class="error" :class="{ active: nameError }">A name is required.</h5>

        <label for="courseCode">Course Code</label>
        <input type="text" name="courseCode" v-model="newClass.courseCode" placeholder="ICS4Ua">
        <h5 class="error" :class="{ active: codeError }">A course code is required.</h5>

        <label for="year">Academic Year</label>
        <input type="text" name="year" v-model="newClass.year" placeholder="2019-2020">
        <h5 class="error" :class="{ active: yearError }">An academic year is required.</h5>

        <label for="block">Block (optional)</label>
        <input type="number" name="block" v-model="newClass.block" min="1" max="8" placeholder="1">

        <label for="students">Students</label>
        <!-- one name per box : validation -->
        <div class="iconBeside" :key="student.id" v-for="student in newClass.students">
          <input type="text" name="student" v-model="student.name" placeholder="John Doe">
          <!-- prohibit deleting last student : validation -->
          <a @click="removeStudent(newClass.students.indexOf(student))"><Icon name="icon-remove-circle" size="2" /></a>
          <a @click="addStudent(newClass.students.indexOf(student))"><Icon name="icon-add-circle" size="2" /></a>
        </div>
        <h5 class="error" :class="{ active: studentsError }">At least one student is required.</h5>

        <div class="buttons">
          <a class="button primary" @click="createClass()"><Icon name="icon-check" />Create</a>
        </div>
      </form>
    </section>
  </body>
</template>

<script>
import fb from '@/firebase'
import { mapActions } from 'vuex'
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
        students: [{ name: '' }]
      },
      nameError: false,
      codeError: false,
      yearError: false,
      studentsError: false
    }
  },
  mounted () {
    this.getYear()
  },
  methods: {
    createClass () {
      this.filterEmpty()

      if (!this.newClass.name) this.nameError = true
      else this.nameError = false

      if (!this.newClass.courseCode) this.codeError = true
      else this.codeError = false

      if (!this.newClass.year) this.yearError = true
      else this.yearError = false

      if (this.newClass.students[0].name === '') this.studentsError = true
      else this.studentsError = false

      if (!this.nameError && !this.codeError && !this.yearError && !this.studentsError) {
        fb.newClass(this.newClass)
        this.setClassKey(this.newClass.key)
        window.history.back()
      }
    },
    filterEmpty () {
      for (let i = 0; i < this.newClass.students.length; i++) {
        let student = this.newClass.students[i]
        if (student.name === '') {
          this.newClass.students.splice(i, 1)
          i--
        }
      }
    },
    getYear () {
      let today = new Date()
      var year1 = today.getFullYear()
      var year2 = year1 + 1
      this.newClass.year = year1 + '-' + year2
    },
    addStudent (val) {
      this.studentsError = false
      this.newClass.students.splice(val + 1, 0, {
        'name': ''
      })
    },
    removeStudent (val) {
      if (this.newClass.students.length > 1) { this.newClass.students.splice(val, 1) } else this.studentsError = true
    },
    goBack () {
      window.history.back()
    },
    ...mapActions([
      'setClassKey'
    ])
  },
  components: {
    Icon
  }
}
</script>
