<template>
  <div class="login">
    <h3>Sign In</h3>
    <input type="email" name="email" v-model="email" placeholder="name@domain.com" required autocomplete="email">
    <br>
    <input type="password" name="password" v-model="password" placeholder="password" required autocomplete="password">
    <br>
    <button @click="login">log in</button>
    <span>
      <a @click="switchAuth">create account</a>
    </span>
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

<style scoped>
</style>
