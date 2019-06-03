<template>
  <div class="sign-up">
    <p>create a new account</p>
    <input type="text" v-model="email" placeholder="Email">
    <br>
    <input type="text" v-model="password" placeholder="Password">
    <br>
    <button @click="signup">sign up</button>
    <span>
      <a @click="switchAuth">login</a>
    </span>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'signup',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    switchAuth () {
      this.$emit('switched', 'login')
    },
    signup () {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(
          function (user) {
            alert('your account has been created')
          },
          function (err) {
            alert('did not work' + err.message)
          }
        )
    }
  }
}
</script>
