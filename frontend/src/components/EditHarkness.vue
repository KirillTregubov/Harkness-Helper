<template>
<body>
  <form>
    <h1>Edit Your Harkness Table</h1>
    <p>Harkness name:</p>
    <input
      v-model="harkness.name"
      type="text"
      name="harknessName"
      v-bind="harkness.name"
      required
    >
    <p>Date:</p>
    <input v-model="harkness.date" type="date" name="harknessDate" v-bind="harkness.date" required>
    <p>Please enter the skills you will be assessing, or add more:</p>
    <div :key="stat.id" v-for="stat in harkness.stats">
      <span>
        <input type="text" name="statName" v-model="stat.title" v-bind="stat.title" placeholder="Textual references">
        <input type="text" name="kica" v-model="stat.kica" v-bind="stat.kica" placeholder="K">
      </span>
    </div>
    <a @click="addStat()">Add New Skill</a>
    <p>Please select any absent students:</p>
  </form>
  <button @click="editHarkness()">Save Changes</button>
</body>
</template>


<script>
export default {
  data: function() {
    return {
      class: ""
    };
  },
  methods: {
      addStudent: function () {
      this.studentsArray.push('')
    }
  },
  mounted: function() {
    const uid = firebase.auth().currentUser.uid;
    firebase
      .database()
      .ref("users")
      .child(uid)
      .child("classes")
      .child(selectedClass)
      .once("value", snapshot => {
        this.isLoading = false;
        this.class = snapshot.val();
      });
    /*
    console.log(this.classes.length)
    if (this.classes.length > 0) {
      this.selectedClass = this.classes[0]
      console.log('sec')
    }
    firebase () {
    const uid = firebase.auth().currentUser.uid
    return {
      classes: db
        .ref('users')
        .child(uid)
        .child('classes')
        
    }
    */
  }
};
</script>