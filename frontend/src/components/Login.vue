<template>
  <div class="login">
    <h3>Sign In</h3>
    <label for="email">Email</label>
    <input type="email" name="email" v-model="email" placeholder="name@domain.com" required autocomplete="email">
    <label for="password">Password</label>
    <input type="password" name="password" v-model="password" placeholder="password" required autocomplete="password">
    <a class="button primary" @click="login">Log In</a>
    <div class="switch">
      <a @click="switchAuth">Create Account</a>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'login',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    switchAuth () {
      this.$emit('switched', '')
    },
    login () {
      // error track

      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          (user) => {
            this.$router.replace('dashboard')
          },
          (err) => {
            alert("it didn't work" + err.message)
          }
        )
    }
  }
}
</script>
