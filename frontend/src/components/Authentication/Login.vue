<template>
  <div class="login">
    <h3>Sign In</h3>
    <label for="email">Email</label>
    <input type="email" name="email" v-model="email" placeholder="name@domain.com" required autocomplete="email">
    <h5 class="error" :class="{ active: emailError }">Valid email required.</h5>
    <label for="password">Password</label>
    <input type="password" name="password" v-model="password" placeholder="password" required autocomplete="password">
    <h5 class="error" :class="{ active: passwordError }">Password must be at least 6 characters.</h5>
    <a class="button primary" @click="login">Sign In</a>
    <div class="switch">
      <a @click="switchAuth">create account</a>
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
      password: '',
      emailError: false,
      passwordError: false
    }
  },
  methods: {
    switchAuth () {
      this.$emit('switched', '')
    },
    login () {
      // error track
      this.emailError = false
      this.passwordError = false

      if (!this.email || (this.email && !this.validateEmail())) {
        // errors.push('Valid email required.')
        this.emailError = true
      } else {
        this.emailError = false
      }

      if (!this.password || (this.password && !this.validatePassword())) {
        this.passwordError = true
      } else {
        this.passwordError = false
      }

      if (!this.emailError && !this.passwordError) {
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
    },
    validateEmail: function () {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(this.email)
    },
    validatePassword: function () {
      return this.password.length > 5
    }
  }
}
</script>
