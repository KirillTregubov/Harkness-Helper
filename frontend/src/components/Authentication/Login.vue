<template>
  <div class="sign-in">
    <h3>Sign In</h3>

    <label for="email">Email</label>
    <input type="email" name="email" v-model="email" placeholder="name@domain.com" required autocomplete="email">
    <h5 class="error" :class="{ active: emailError }">{{ emailErrorText }}</h5>

    <label for="password">Password</label>
    <input type="password" name="password" v-model="password" placeholder="Password" required autocomplete="password">
    <h5 class="error" :class="{ active: passwordError }">{{ passwordErrorText }}</h5>

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
      emailErrorText: 'Valid email required.',
      passwordError: false,
      passwordErrorText: 'Password must be at least 6 characters.'
    }
  },
  methods: {
    switchAuth () {
      this.$emit('switched', '')
    },
    login () {
      if (!this.email || !this.validateEmail()) this.emailError = true
      else {
        this.emailErrorText = 'Valid email required.'
        this.emailError = false
      }

      if (!this.password || !this.validatePassword()) this.passwordError = true
      else {
        this.passwordErrorText = 'Password must be at least 6 characters.'
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
            (error) => {
              console.log(error)
              if (error.code.includes('user')) {
                this.emailError = true
                this.emailErrorText = error.message.replace('identifier', 'email')
              } else if (error.code.includes('password')) {
                this.passwordError = true
                this.passwordErrorText = error.message
              }
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
