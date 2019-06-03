<template>
<body v-if="classKey !== null">
  <form>
    <h1>Add a New Harkness Table</h1>
    <p>Harkness name:</p>
    <input type="text" v-model="harkness.name" name="harknessName" placeholder="Romeo and Juliet Harkness" required>
    <p>Date:</p>
    <input type="date" v-model="harkness.date" name="harknessDate" required>
    <p>Please enter the skills you will be assessing, or add more:</p>
    <div :key="stat.id" v-for="stat in harkness.stats">
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
<body v-else>CAN'T CREATE HARKNESS GO BACK</body>
</template>

<script>
import firebase from "firebase";

export default {
  data: function() {
    return {
      isLoading: false,
      harkness: {
        name: "",
        date: "",
        key: "",
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
  methods: {
    addHarkness() {
      const uid = firebase.auth().currentUser.uid;
      const ref = firebase
        .database()
        .ref("users")
        .child(uid)
        .child("classes")
        .child(this.classKey)
        .child("harknesses");
      this.harkness.key = ref.push().getKey();
      ref.child(this.harkness.key).set(this.harkness);
    },
    addStat() {
      this.harkness.stats.push("");
    }
  }
};
</script>
