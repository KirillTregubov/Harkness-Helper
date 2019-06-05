<template>
  <div class="sign-up">
    <h3>Create a New Account</h3>
    <label for="email">Email</label>
    <input type="email" name="email" v-model="email" placeholder="name@domain.com" required autocomplete="email">
    <label for="password">Password</label>
    <input type="password" name="password" v-model="password" placeholder="password" required autocomplete="password">
    <a class="button primary" @click="signup">Sign Up</a>
    <div class="switch">
      <a @click="switchAuth">sign in</a>
    </div>
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
