<template>
  <body id="harkness" v-if="!isLoading">
    <section class="container">
      <header>
        <div class="title">
          <div class="back" @click="goBack()">
            <Icon name="icon-cheveron-left-circle" size="1.6" />
            <h2>Go Back</h2>
          </div>
          <h1>{{harkness.name}}</h1>
        </div>
        <h2 class="subtitle">{{harkness.date}}</h2>
      </header>
      <div class="studentContainer" v-if="harkness.students">
        <div class="student" :key="index" v-for=" (student, index) in harkness.students">
            <span id="student">Student Name: {{student.name}}</span>
            <form style="display: inline-block">
            <label for="K">K</label>
            <input type="number" min="0" max="4"  name="K" id="K" v-model="student.K">
            <label for="I">I</label>
            <input type="number" min="0" max="4"  name="I" id="I" v-model="student.I">
            <label for="C">C</label>
            <input type="number" min="0" max="4"  name="C" id="C" v-model="student.C">
            <label for="A">A</label>
            <input type="number" min="0" max="4"  name="A" id="A" v-model="student.A">
            </form>
            <p>You can enter a comment for the student here.</p>
            <input v-model="studentComment[index]" type="text" name="comments">
            <button type="button" @click="submitComment(student)">Save Comment</button>
        </div>
      </div>
      <div v-else>You have no students in this harkness table</div>
      
      <button type="button" @click="saveChanges">Save Changes</button>
      <router-link to="/dashboard" tag="button">Dashboard</router-link>
      <!--
      <div id="timer">00:00</div>
      <button type="button" @click="timer()" id="start">Start</button>
      <button type="button" id="stop" disabled="true">Stop</button>
      -->
      <router-link to="/edit/harkness"><Icon name="icon-edit" size="2" /></router-link>
    </section>
  </body>
  <body id="loading" v-else>
    <div class="loader">
      <div></div>
    </div>
  </body>
</template>

<script>
// import VueSVG from '@/components/VueSVG.vue'
import fb from '@/firebase'
import { mapGetters, mapActions } from 'vuex'
import Icon from '@/components/Iconography/Icon.vue'

export default {
  name: 'harkness-view',
  data () {
    return {
      studentComment: [],
      harkness: '',
      harknessTime: 0,
      time: -1,
      intervalId: 0,
      isLoading: true
      // start: document.getElementById('start'), don't do this there's a better way
      // stop: document.getElementById('stop')
    }
  },
  computed: {
    ...mapGetters([
      'getClassKey',
      'getHarknessKey'
    ])
  },
  mounted () {
    if (!this.getHarknessKey)  this.$router.push('/*')
    fb.getHarkness(this.getClassKey, this.getHarknessKey, snapshot => {
      this.harkness = snapshot.val()
      this.isLoading = false
    })
  },
  components: {
    // VueSVG,
    Icon
  },
  methods: {
    goBack () {
      window.history.back()
    },
    saveChanges () {
      fb.updateHarknessStudents(this.getClassKey, this.getHarknessKey, this.harkness.students)
      // this.$router.go()
      // console.log(this.harkness.students)
    },
    submitComment (student) {
      let index = this.harkness.students.indexOf(student)
      let comment = this.studentComment[index]
      this.studentComment = []
      fb.addStudentComment(this.getClassKey, this.getHarknessKey, index, comment)
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

<style lang="scss">
body#harkness {
  background-image: var(--bg-image);
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .container {
    background-color: var(--neutral050);
    box-shadow: var(--shadow-deep-sm);
    border-radius: var(--border-radius);
    width: 70vw;
    // min-width: 300px; implement
    max-height: 90vh;
    padding: 2rem;
    margin-bottom: 1rem;
    overflow: auto;

    header {
      margin-bottom: 2rem;

      .title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 0.5rem;

        .back {
          display: flex;
          align-items: center;
          padding: 0.2rem 0.35rem 0.3rem 0.25rem;
          border-radius: var(--border-radius);
          user-select: none;

          &:hover {
            background-color: var(--neutral200);
            box-shadow: var(--shadow-inset);
          }

          svg {
            margin: 0 0.25rem 0 0;

            .primary {
              fill: var(--neutral300);
            }

            .secondary {
              fill: var(--neutral900);
            }
          }

          h2 {
            margin: 0;
            font-size: var(--text-lg);
            font-weight: var(--font-bold);
          }
        }

        h1 {
          margin: 0;
          font-size: var(--text-2xl);
        }
      }

      h2 {
        text-align: right;
        margin: 0;
        font-size: var(--text-lg);
        font-weight: var(--font-bold);
        color: var(--primary800);
      }
    }

    .studentContainer {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      justify-items: center;

      .student {
        display: flex;
        flex-direction: column;

        background-color: #fff;
        margin: 1rem;
      }
    }
    
  }
}

#K, #I, #C, #A {
  width: 30px;
}
</style>
