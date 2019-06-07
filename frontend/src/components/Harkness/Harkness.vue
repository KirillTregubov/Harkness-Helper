<template>
  <body id="harkness" v-if="!isLoading">
    <section class="container">
      <header>
        <div class="title">
          <div class="back" @click="goBack()">
            <Icon name="icon-cheveron-left-circle" size="1.6" />
            <h2>Home</h2>
          </div>
          <h1>{{harkness.name}}</h1>
        </div>
        <h2 class="subtitle">{{harkness.date}}</h2>
        <h2 class="subtitle secondary">Write a quick observation or comment about any student during a harkness table.</h2>
      </header>

      <div class="studentContainer" v-if="harkness.students">
        <div class="student" :key="index" v-for=" (student, index) in harkness.students">
          <input :id="index" class="toggle" type="checkbox">
          <label :for="index" class="name">{{student.name}}</label>
          <div class="content">
            <div class="content-inner">
              <label>Comment</label>
              <input v-model="studentComment[index]" type="text" name="comments" placeholder="Add Comment">
              <h5 class="error" :class="{ active: commentError === index }">A comment is required.</h5>

              <label>KICA Marking</label>
              <div class="kica" style="display: inline-block">
                <div>
                  <label for="K">K</label>
                  <input type="number" min="0" max="4"  name="K" v-model="student.K">
                </div>
                <div>
                  <label for="I">I</label>
                  <input type="number" min="0" max="4"  name="I" v-model="student.I">
                </div>
                <div>
                  <label for="C">C</label>
                  <input type="number" min="0" max="4"  name="C" v-model="student.C">
                </div>
                <div>
                  <label for="A">A</label>
                  <input type="number" min="0" max="4"  name="A" v-model="student.A">
                </div>
              </div>
              <a @click="saveChanges(student)" class="button"><span><Icon name="icon-check" />Save Changes</span></a>
            </div>
          </div>
        </div>
      </div>
      <div v-else>You have no students in this harkness table</div>

      <div class="buttons">
        <!--<a class="button primary" @click="saveChanges()"><Icon name="icon-check" />Save Changes</a>-->
        <router-link class="button primary" to="/edit/harkness"><Icon name="icon-edit" />Edit Harkness</router-link>
      </div>
      <!--
      <div id="timer">00:00</div>
      <button type="button" @click="timer()" id="start">Start</button>
      <button type="button" id="stop" disabled="true">Stop</button>
      -->
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
import { mapGetters } from 'vuex'
import Icon from '@/components/Iconography/Icon.vue'

export default {
  name: 'harkness-view',
  data () {
    return {
      isLoading: true,
      studentComment: [],
      harkness: '',
      commentError: null
      // harknessTime: 0,
      // time: -1,
      // intervalId: 0,
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
    if (!this.getHarknessKey) this.$router.push('/*')
    fb.getHarkness(this.getClassKey, this.getHarknessKey, snapshot => {
      this.harkness = snapshot.val()
      this.isLoading = false
    })
  },
  methods: {
    goBack () {
      this.$router.push('/dashboard')
    },
    saveChanges (student) {
      fb.updateHarknessStudents(this.getClassKey, this.getHarknessKey, this.harkness.students)
      if (this.studentComment[this.harkness.students.indexOf(student)]) this.submitComment(student)
      // this.$router.push('/dashboard')
    },
    submitComment (student) {
      let index = this.harkness.students.indexOf(student)
      let comment = this.studentComment[index]

      if (!comment) this.commentError = index
      else this.commentError = null

      if (!this.commentError) {
        this.studentComment = []
        fb.addStudentComment(this.getClassKey, this.getHarknessKey, index, comment)
      }
    }
    /* timer () {
      // make an @click event instead
      this.start.addEventListener('click', function () {
        incrementTime()
        this.intervalId = setInterval(this.incrementTime, 1000)
        this.start.disabled = true
        this.stop.disabled = false
      })
      stop.addEventListener('click', function () {
        clearInterval(this.intervalId)
        this.start.disabled = false
        this.stop.disabled = true
        this.harknessTime = this.time
      })
    },
    incrementTime () {
      this.time++
      // dont do this
      document.getElementById('timer').innerText =
        ('0' + Math.trunc(this.time / 60)).slice(-2) +
        ':' +
        ('0' + (this.time % 60)).slice(-2)
    } */
  },
  components: {
    Icon
  }
}
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
    width: 95vw;
    // min-width: 300px; implement
    max-height: 95vh;
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

        &.secondary {
          font-size: var(--text-lg);
          color: var(--primary700);
        }
      }
    }

    .studentContainer {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      justify-items: center;

      .student {
        display: flex;
        flex-direction: column;
        background-color: var(--neutral050);
        border-radius: var(--border-radius);
        box-shadow: var(--shadow-deep);
        margin: 0.5rem;

        input[type='checkbox'] {
          display: none;
        }
        .toggle:checked + .name::before {
          transform: rotate(90deg)
        }
        .toggle:checked + .name + .content {
          max-height: 350px;
        }

        .name {
          padding: 1rem;
          font-size: var(--text-md);
          font-weight: var(--font-bold);
          cursor: pointer;

          &::before {
            content: ' ';
            display: inline-block;
            border-top: 5px solid transparent;
            border-bottom: 5px solid transparent;
            border-left: 5px solid currentColor;
            vertical-align: middle;
            margin-right: .7rem;
            // transform: translateY(1px);
            transition: transform .3s ease-out;
          }
        }

        .content {
          max-height: 0px;
          overflow: hidden;
          transition: max-height 0.5s ease-in-out;

          .content-inner {
            padding: 1rem;
            padding-top: 0;
          }

          h5.error {
            display: none;
            color: var(--primary600);
            transition: all 500ms linear;
            animation: shake 0.5s cubic-bezier(.36, .07, .19, .97) both;
            transform: translate3d(0, 0, 0);
            backface-visibility: hidden;
            margin: 0 0 1rem 0;

            &.active {
              display: block;
            }
          }

          label {
            display: block;
            font-size: 0.85rem;
            margin-bottom: 0.5rem;
          }

          a.button {
            width: calc(100% - 2rem);
          }

          input {
            box-sizing: border-box;
            border: 1px solid #c2c2c2;
            background-color: var(--neutral200);
            box-shadow: 1px 1px 4px #ebebeb;
            border-radius: 3px;
            padding: 0.5rem;
            width: 100%;
            outline: none;
            margin-bottom: 1em;
            line-height: 20px;
            transition: all ease 0.5s;
            font-size: var(--text-md);

            &:hover {
              background-color: var(--neutral100) !important;
            }
          }

          .kica {
            width: calc(100%);

            > div {
              display: inline-block;
              width: calc(50% - 0.5rem);

              &:nth-child(odd) {
                padding-right: 0.5rem;
              }

              &:nth-child(even) {
                padding-left: 0.5rem;
              }
            }

            label {
              display: inline-block;
              width: 0.75rem;
              margin-right: 0.5rem;
              margin-bottom: 0;
            }

            input {
              width: calc(100% - 1.25rem);
              font-size: 0.8rem;
              line-height: 8px;
            }
          }
        }
      }
    }

  .buttons {
    margin-top: 2rem;
    margin-left: 0.5rem;
  }
  }
}
</style>
