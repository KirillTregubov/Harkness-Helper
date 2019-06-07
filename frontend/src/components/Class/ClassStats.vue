<template>
  <div v-if="selectedClass.harknesses">
    <div id="averageKICA">
      <h3 class="top">Class KICA Average: K:{{KICAavg.K}} I:{{KICAavg.I}} C:{{KICAavg.C}} A:{{KICAavg.A}}</h3>
    </div>
    <h3 class="title">Student Comments</h3>
    <div class="student" :key="index" v-for=" (item, index) in comments">
      <div v-if="item.comments.length > 0">
      <input :id="index" class="toggle" type="checkbox">
      <label :for="index" class="name">{{item.name}}</label>
      <div class="content">
        <div class="content-inner">
          <p :key="comment.id" v-for="comment in item.comments">{{comment}}</p>
        </div>
      </div>
      </div>
    </div>
  </div>

  <div class="empty" v-else>
    <h3>You have no previous stats for this class. Please create a new Harkness table above to start tracking stats.</h3>
    <VueSVG name="missing" size="0.4"/>
  </div>
</template>

<script>
import VueSVG from '@/components/Iconography/VueSVG.vue'

export default {
  data () {
    return {
      comments: [],
      KICAavg: { K: 0, I: 0, C: 0, A: 0 }
    }
  },
  methods: {
    computeKICA () {
      let KICAsum = { K: 0, I: 0, C: 0, A: 0 }
      let KICAcount = { K: 0, I: 0, C: 0, A: 0 }
      for (
        let i = 0;
        i < Object.keys(this.selectedClass.harknesses).length;
        i++
      ) {
        let currHark = this.selectedClass.harknesses[Object.keys(this.selectedClass.harknesses)[i]]
        for (let j = 0; j < currHark.students.length; j++) {
          let student = currHark.students[j]
          if (student.K > 0) {
            KICAsum.K += parseInt(student.K)
            KICAcount.K++
          }
          if (student.I) {
            KICAsum.I += parseInt(student.I)
            KICAcount.I++
          }
          if (student.C) {
            KICAsum.C += parseInt(student.C)
            KICAcount.C++
          }
          if (student.A) {
            KICAsum.A += parseInt(student.A)
            KICAcount.A++
          }
        }
      }
      this.KICAavg.K = this.round(KICAsum.K / KICAcount.K)
      this.KICAavg.I = this.round(KICAsum.I / KICAcount.I)
      this.KICAavg.C = this.round(KICAsum.C / KICAcount.C)
      this.KICAavg.A = this.round(KICAsum.A / KICAcount.A)
    },
    populateComments () {
      // console.log(students)
      let tempComments = []
      for (
        let i = 0;
        i < Object.keys(this.selectedClass.harknesses).length;
        i++
      ) {
        let currHark = this.selectedClass.harknesses[Object.keys(this.selectedClass.harknesses)[i]]
        for (let j = 0; j < currHark.students.length; j++) {
          let student = currHark.students[j]
          let studentName = student.name
          if (student.comments) {
            for (let k = 0; k < Object.keys(student.comments).length; k++) {
              let comment = student.comments[Object.keys(student.comments)[k]]
              // console.log(comment)
              tempComments.push({ name: studentName, comment: comment })
              //    this.comments[studentName].push});
            }
          }
        }
      }
      this.selectedClass.students
        .map(a => a.name)
        .forEach(student => {
          let temp = []
          tempComments.forEach(comment => {
            if (comment.name === student) temp.push(comment.comment)
          })
          this.comments.push({ name: student, comments: temp })
        })
    },
    round (num) {
      return Math.floor(num * 10) / 10
    }
  },
  props: {
    selectedClass: Object
  },
  mounted () {
    this.computeKICA()
    this.populateComments()
  },
  comopnents: {
    VueSVG
  }
}
</script>

<style lang="scss" scoped>

h3.top {
  margin-top: 0;
}

.title {
  margin-bottom: 0.5rem;
}

input[type='checkbox'] {
  display: none;
}
.toggle:checked + .name::before {
  transform: rotate(90deg);
}
.toggle:checked + .name + .content {
  max-height: 350px;
}

.name {
  font-size: var(--text-md);
  font-weight: var(--font-bold);
  cursor: pointer;
  margin-left: 0.5rem;

  &::before {
    content: ' ';
    display: inline-block;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    border-left: 5px solid currentColor;
    vertical-align: middle;
    margin-right: 0.7rem;
    // transform: translateY(1px);
    transition: transform 0.3s ease-out;
  }
}

.student {
  margin-bottom: 0.5rem;

  .content {
    max-height: 0px;
    overflow: auto;
    margin-top: 0.5rem;
    transition: opacity 0.2s ease-in-out;

    .content-inner {
      padding: 0 0.5rem;

      p {
        margin-top: 0;
        margin-bottom: 0.25rem;
      }
    }
  }
}
</style>
