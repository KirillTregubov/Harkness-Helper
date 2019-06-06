<template>
<body class="focused">
  <section class="container">
    <form>
      <h1>Edit a Class</h1>

      <label for="className">Class Name</label>
      <input type="text" name="className" v-model="selectedClass.name">
      
      <label for="courseCode">Course Code</label>
      <input type="text" name="courseCode" v-model="selectedClass.courseCode">
      
      <label for="year">Academic Year</label>
      <input type="text" name="year" v-model="selectedClass.year">

      <label for="block">Block</label>
      <input type="number" name="block" v-model="selectedClass.block" min="1" max="8">

      <label for="students">Students</label>
      <!-- one name per box : validation -->
      <div class="iconBeside" :key="student.id" v-for="student in selectedClass.students">
        <input type="text" name="student" v-model="student.name">
        <!-- prohibit deleting last student : validation -->
        <a @click="removeStudent(newClass.students.indexOf(student))"><Icon name="icon-remove-circle" size="2" /></a>
        <a @click="addStudent(newClass.students.indexOf(student))"><Icon name="icon-add-circle" size="2" /></a>
      </div>
      <a class="button primary" @click="editClass()">Save Changes</a>
      <button type="button destructive" @click="deleteClass()">Delete Class</button>
    </form>
  </section>
</body>
</template>

<script>
import fb from "@/firebase";
import Icon from '@/components/Iconography/Icon.vue'

export default {
  name: 'EditClass',
  data () {
    return {
      selectedClass: ""
    };
  },
  props: {
    classKey: {
      type: String,
      default: null
    }
  },
  methods: {
    /*
    validation
    */
    addStudent (val) {
      this.selectedClass.students.splice( val + 1, 0, {
        'name': ''
      })
    },
    removeStudent (val) {
      this.selectedClass.students.splice(val, 1)
    },
    deleteClass () {
      fb.deleteClass(this.classKey);
      this.$router.push({name: "layout"});
    }
  },
  mounted () {
    fb.getClass(this.classKey, snapshot => {
        this.isLoading = false;
        this.selectedClass = snapshot.val();
      });
  },
  components: {
    Icon
  }
};
</script>
