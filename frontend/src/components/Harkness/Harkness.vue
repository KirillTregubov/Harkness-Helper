<template>
  <div id="markingHarkness">
    <h1>{{harkness.name}} | {{harkness.date}}</h1>
    <div v-if="harkness.students" id="table">
      <!--<Icon name="icon-add-circle"/>-->
      <div id="addStudents" v-for=" (student, index) in harkness.students">
        <p id="student">{{student.name}} <input v-model="studentComment[index]" type="text" name="comments"> <button type="button" @click="submitComment(student)">Submit</button></p>
      </div>
    </div>
    <div v-else>You have no students in this harkness table</div>
    <!--
    <div id="timer">00:00</div>
    <button type="button" @click="timer()" id="start">Start</button>
    <button type="button" id="stop" disabled="true">Stop</button>
    -->
  </div>
</template>

<script>
// import VueSVG from '@/components/VueSVG.vue'
import Icon from "@/components/Iconography/Icon.vue";
import fb from "@/firebase";

export default {
  name: "harkness-view",
  data: function() {
    return {
      studentComment: [], 
      harkness: "",
      harknessTime: 0,
      time: -1,
      intervalId: 0,
      start: document.getElementById("start"),
      stop: document.getElementById("stop")
    };
  },
  mounted: function() {
    fb.getHarkness(this.classKey, this.harknessKey, snapshot => {
      this.harkness = snapshot.val();
    });
  },
  props: {
    classKey: "",
    harknessKey: ""
  },
  components: {
    // VueSVG,
    Icon
  },
  methods: {
    submitComment: function(student) {
      let index = this.harkness.students.indexOf(student)
      let comment = this.studentComment[index]
      this.studentComment = []
      fb.addStudentComment(this.classKey, this.harknessKey, index, comment)
    },
    timer() {
      start.addEventListener("click", function() {
        incrementTime();
        intervalId = setInterval(incrementTime, 1000);
        start.disabled = true;
        stop.disabled = false;
      });

      stop.addEventListener("click", function() {
        clearInterval(intervalId);
        start.disabled = false;
        stop.disabled = true;
        harknessTime = time;
        console.log(harknessTime);
      });
    },
    incrementTime() {
      time++;
      document.getElementById("timer").innerText =
        ("0" + Math.trunc(time / 60)).slice(-2) +
        ":" +
        ("0" + (time % 60)).slice(-2);
    }
  }
};

// import Icon from '@/components/Icon.vue'
</script>

<style lang="scss" scoped>
svg {
  &.icon-add-circle {
    width: 2rem;
    height: 2rem;
    margin: auto;
  }
}
</style>
