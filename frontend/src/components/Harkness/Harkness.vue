<template>
  <div id="markingHarkness">
    <h1>{{harkness.name}} | {{harkness.date}}</h1>
    <div v-if="harkness.students" id="table">
      <!--<Icon name="icon-add-circle"/>-->
      <div id="students" :key="index" v-for=" (student, index) in harkness.students">
        <span id="student">{{student.name}}</span>
        <input v-model="studentComment[index]" type="text" name="comments">
        <button type="button" @click="submitComment(student)">Submit</button>
        <form style="display: inline-block">
        <label for="K">K</label>
        <input type="number" name="K" id="K" v-model="student.K">
        <label for="I">I</label>
        <input type="number" name="I" id="I" v-model="student.I">
        <label for="C">C</label>
        <input type="number" name="C" id="C" v-model="student.C">
        <label for="A">A</label>
        <input type="number" name="A" id="A" v-model="student.A">
        </form>
      </div>
      <button type="button" @click="saveChanges">Save Changes</button>
    </div>
    <div v-else>You have no students in this harkness table</div>

      <router-link :to="{name: 'layout'}" tag="button">Dashboard</router-link>
    <!--
    <div id="timer">00:00</div>
    <button type="button" @click="timer()" id="start">Start</button>
    <button type="button" id="stop" disabled="true">Stop</button>
    -->
    <router-link :to="{name: 'edit-harkness', params: { classKey: classKey, harknessKey: harknessKey } }"><Icon name="icon-edit"/></router-link>
  </div>
</template>

<script>
// import VueSVG from '@/components/VueSVG.vue'
import Icon from '@/components/Iconography/Icon.vue'
import fb from '@/firebase'

export default {
  name: 'harkness-view',
  data () {
    return {
      studentComment: [],
      harkness: '',
      harknessTime: 0,
      time: -1,
      intervalId: 0
      // start: document.getElementById('start'), don't do this there's a better way
      // stop: document.getElementById('stop')
    }
  },
  mounted () {
    fb.getHarkness(this.classKey, this.harknessKey, snapshot => {
      this.harkness = snapshot.val()
    })
  },
  props: {
    // classKey:
    // harknessKey:
  },
  components: {
    // VueSVG,
    Icon
  },
  methods: {
    saveChanges () {
      fb.updateHarknessStudents(this.classKey, this.harknessKey, this.harkness.students)
      // this.$router.go()
      // console.log(this.harkness.students)
    },
    submitComment (student) {
      let index = this.harkness.students.indexOf(student)
      let comment = this.studentComment[index]
      this.studentComment = []
      fb.addStudentComment(this.classKey, this.harknessKey, index, comment)
    },
    timer () {
      /* make an @click event instead
      this.start.addEventListener('click', function () {
        incrementTime()
        this.intervalId = setInterval(this.incrementTime, 1000)
        this.start.disabled = true
        this.stop.disabled = false
      }) */

      stop.addEventListener('click', function () {
        clearInterval(this.intervalId)
        this.start.disabled = false
        this.stop.disabled = true
        this.harknessTime = this.time
      })
    },
    incrementTime () {
      this.time++
      /* dont do this
      document.getElementById('timer').innerText =
        ('0' + Math.trunc(this.time / 60)).slice(-2) +
        ':' +
        ('0' + (this.time % 60)).slice(-2) */
    }
  }
}

// import Icon from '@/components/Icon.vue'
</script>

<style lang="scss" scoped>
#K, #I, #C, #A {
  width: 30px;
}
svg {
  &.icon-add-circle {
    width: 2rem;
    height: 2rem;
    margin: auto;
  }
}
</style>
