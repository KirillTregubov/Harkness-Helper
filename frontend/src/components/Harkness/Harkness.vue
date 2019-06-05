<template>
    <div id="markingHarkness">
        <h1>Harkness Table</h1>
        <div id="table">
            <Icon name="icon-add-circle"/>
            <div id="box"></div>
            <div id="addStudents">
                <!-- new student elements will be appended here -->
            </div>
        </div>
        <div id="timer">00:00</div>
        <button id="start">Start</button>
        <button id="stop" disabled="true">Stop</button>
    </div>
</template>

<script>
// import VueSVG from '@/components/VueSVG.vue'
import Icon from '@/components/Iconography/Icon.vue'

export default {
  name: 'harkness-view',
  //   props: {
  //     selectedHarkness: Object
  //   },
  components: {
    // VueSVG,
    Icon
  }
}
/*
var harknessTime;
// import Icon from '@/components/Icon.vue'
window.onload = function() {
    timer();
}

function timer(){
    var time, intervalId;
    var start = document.getElementById("start");
    var stop = document.getElementById("stop");

    start.addEventListener("click", function() {
        time = -1;
        incrementTime();
        intervalId = setInterval(incrementTime, 1000);
        start.disabled = true;
        stop.disabled = false;
    });

    stop.addEventListener("click", function(){
        clearInterval(intervalId);
        start.disabled = false;
        stop.disabled = true;
        harknessTime = time;
        console.log(harknessTime);
    });

    function incrementTime(){
        time++;
        document.getElementById("timer").innerText = ("0" + Math.trunc(time / 60)).slice(-2) +":" + ("0" + (time % 60)).slice(-2);
    }
} */
</script>

<style lang="scss" scoped>
    #box{
        width: 20rem;
        height: 40rem;
        border: 5px solid black;
        margin: auto;
    }
    svg{
        &.icon-add-circle{
        width: 2rem;
        height: 2rem;
        margin: auto;
        }
    }
</style>
