<template>
<body v-if="classKey !== null">
  <form>
    <h1>Add a New Harkness Table</h1>
    <p>Harkness name:</p>
    <input type="text" name="harknessName" placeholder="Romeo and Juliet Harkness" required>
    <p>Date:</p>
    <input type="date" name="harknessDate" required>
    <p>Please enter the skills you will be assessing, or add more:</p>
    <div :key="stat.id" v-for="stat in defaultStatsArray">
        <span>
            <input type="text" name="statName" v-model="stat.title" placeholder="Textual references">
            <input type="text" name="kica" v-model="stat.kica" placeholder="K">
        </span>
    </div>
    <a @click="addStat()">Add New Skill</a>
    <p>Please select any absent students:</p>
  </form>
  <button @click="addHarkness()">Submit</button>
</body>
<body v-else>
  CAN'T CREATE HARKNESS GO BACK
</body>
</template>

<script>
export default {
  data: function () {
    return {
      isLoading: false,
      class: {},
      defaultStatsArray: [{
        kica: 'K',
        title: 'Textual references'
      },
      {
        kica: 'I',
        title: 'Generates ideas'
      },
      {
        kica: 'C',
        title: 'Maintains engaged body language'
      },
      {
        kica: 'A',
        title: 'Contributes cooperatively'
      }
      ]
    }
  },
  props: {
    classKey: {
      type: String,
      default: null
    },
  },
  methods: {
    // addHarkness () {
    //     const uid = firebase.auth().currentUser.uid
    //     firebase.database().ref('users').child(uid)
    // }, ALEX pls fix this

    addStat () {
      this.defaultStatsArray.push('')
    }
  }
}
</script>
