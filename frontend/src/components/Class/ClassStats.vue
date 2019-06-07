<template>
  <div v-if="selectedClass.harknesses">
    <div id="averageKICA">
      <span>
        <h3>Class Average</h3>
      </span>
      <span>K: {{KICAavg.K}} |</span>
      <span>I: {{KICAavg.I}} |</span>
      <span>C: {{KICAavg.C}} |</span>
      <span>A: {{KICAavg.A}}</span>
    </div>
    <!--
    <div id="randomComments">
      <ul v-for="student in ">
        <li>{{comment.student}}: {{comment.value}}</li>
      </ul>
    </div>
    -->
  </div>

  <div class="empty" v-else>
    <h3>You have no previous stats for this class. Please create a new Harkness table above to start tracking stats.</h3>
    <VueSVG name="missing" size="0.4"/>
  </div>
</template>

<script>
import VueSVG from '@/components/Iconography/VueSVG.vue';

export default {
  data() {
    return {
      comments: [[]],
      KICAavg: { K: 0, I: 0, C: 0, A: 0 }
    };
  },
  methods: {
    computeKICA() {
      let KICAsum = { K: 0, I: 0, C: 0, A: 0 };
      let KICAcount = { K: 0, I: 0, C: 0, A: 0 };
      for (
        let i = 0;
        i < Object.keys(this.selectedClass.harknesses).length;
        i++
      ) {
        let currHark = this.selectedClass.harknesses[
          Object.keys(this.selectedClass.harknesses)[i]
        ];
        for (let j = 0; j < currHark.students.length; j++) {
          let student = currHark.students[j];
          if (student.K > 0) KICAsum.K += parseInt(student.K);
          KICAcount.K++;
          if (student.I) KICAsum.I += parseInt(student.I);
          KICAcount.I++;
          if (student.C) KICAsum.C += parseInt(student.C);
          KICAcount.C++;
          if (student.A) KICAsum.A += parseInt(student.A);
          KICAcount.A++;
        }
      }
      this.KICAavg.K = this.round(KICAsum.K / KICAcount.K);
      this.KICAavg.I = this.round(KICAsum.I / KICAcount.I);
      this.KICAavg.C = this.round(KICAsum.C / KICAcount.C);
      this.KICAavg.A = this.round(KICAsum.A / KICAcount.A);
    },
    populateComments() {
      //console.log(students)
      for (
        let i = 0;
        i < Object.keys(this.selectedClass.harknesses).length;
        i++
      ) {
        let currHark = this.selectedClass.harknesses[
          Object.keys(this.selectedClass.harknesses)[i]
        ];
        for (let j = 0; j < currHark.students.length; j++) {
          let student = currHark.students[j];
          let studentName = student.name;
          if (student.comments) {
            /*
            if (this.comments[studentName]){
            this.comments[studentName].push({student.comments})
            } else {
              this.comments[studentName] = student.comments
            }
            */

            //console.log(student.comments)
            for (let k = 0; k < student.comments.length; k++) {
              this.comments[studentName]
              //    this.comments[studentName].push});
            }
          }
        }
      }
      console.log('comments array');
      console.log(this.comments);
    },
    round(num) {
      return Math.floor(num * 10) / 10;
    }
  },
  props: {
    selectedClass: Object
  },
  mounted() {
    this.computeKICA();
    this.populateComments();
  },
  comopnents: {
    VueSVG
  }
};
</script>