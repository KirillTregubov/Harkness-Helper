<template>
<body>
  <form>
    <h1>Edit Your Class</h1>
    <p>Class name:</p>
    <input
      v-model="class.name"
      type="text"
      name="className"
      v-bind="class.name"
      required
    >
    <p>Course code:</p>
    <input
      v-model="class.courseCode"
      type="text"
      name="courseCode"
      v-bind="class.courseCode"
      required
    >
    <p>Year:</p>
    <p>
      <input v-model="class.year" type="text" name="year" v-bind="class.year" required>
    </p>
    <p>Block:</p>
    <input
      v-model="class.block"
      type="number"
      min="1"
      max="8"
      name="block"
      v-bind="class.block"
      required
    >
    <p>Students (please enter names one per box):</p>
    <div :key="student.id" v-for="student in studentsArray">
      <input type="text" name="student" v-model="student.name" placeholder="Kevin DesLauriers">
    </div>
    <a class="button" @click="addStudent()">Add Student</a>
  </form>
  <button @click="editClass()">Save Changes</button>
</body>
</template>

<script>
export default {
  data: function () {
    return {
      class: ''
    }
  },
  methods: {
    addStudent: function () {
      this.studentsArray.push('')
    }
  },
  mounted: function () {
    const uid = firebase.auth().currentUser.uid
    firebase
      .database()
      .ref('users')
      .child(uid)
      .child('classes')
      .child(selectedClass)
      .once('value', snapshot => {
        this.isLoading = false
        this.class = snapshot.val()
      })
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
}
</script>
