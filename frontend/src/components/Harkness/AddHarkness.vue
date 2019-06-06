<template>
<body class="focused">
  <section class="container">
    <form>
      <h1>Create a Harkness Table</h1>
      
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
</template>

<script>
import firebase from "firebase";
import fb from "@/firebase";
import Icon from '@/components/Iconography/Icon.vue'

export default {
  name: 'AddHarkness',
  data () {
    return {
      absentStudents: [],
      isLoading: false,
      students: [],
      harkness: {
        name: "",
        date: "",
        key: "",
        students: [],
        stats: []
      }
    };
  },
  props: {
    classKey: {
      type: String,
      default: null
    }
  },
  mounted () {
    fb.getStudents(this.classKey, snapshot => {
      this.students = snapshot.val();
    });
  },
  methods: {
    removeAbsentStudents () {
      this.harkness.students = this.students;
      for (let i = 0; i < this.absentStudents.length; i++) {
        let index = this.harkness.students.indexOf(this.absentStudents[i]);
        if (index > -1) {
          this.harkness.students.splice(index, 1);
        }
      }
    },
    addAbsent (student) {
      this.absentStudents.push(student);
      console.log(this.absentStudents);
    },
    createHarkness () {
      this.removeAbsentStudents();
      console.log(this.harkness.students);
      fb.newHarkness(this.classKey, this.harkness);
      this.$router.push({name: "view-harkness", params:{classKey: this.classKey, harknessKey: this.harkness.key}})
    },
    addStat () {
      this.harkness.stats.push("");
    }
  },
  components: {
    Icon
  }
};
</script>
