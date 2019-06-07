<template>
  <div class="sign-up" v-if="!signupSuccess">
    <h3>Create a New Account</h3>

    <label for="name">Full Name</label>
    <div class="split">
      <input type="text" name="fname" v-model="userData.firstName" placeholder="John" required autocomplete="given-name">
      <input type="text" name="lname" v-model="userData.lastName" placeholder="Doe" required autocomplete="family-name">
    </div>
    <h5 class="error" :class="{ active: nameError }">A name is required.</h5>

    <label for="email">Email</label>
    <input type="email" name="email" v-model="email" placeholder="name@school.com" required autocomplete="email">
    <h5 class="error" :class="{ active: emailError }">{{ emailErrorText }}</h5>

    <label for="password">Password</label>
    <input type="password" name="password" v-model="password" placeholder="Password" required>
    <h5 class="error" :class="{ active: passwordError }">Password must be at least 6 characters.</h5>

    <label for="password">Confirm Password</label>
    <input type="password" name="password" v-model="passwordConfirmation" placeholder="Confirm Password" required>
    <h5 class="error" :class="{ active: passwordConfirmationError }">Passwords must match.</h5>

    <label for="province">Province</label>
    <vue-single-select
          inputId="province"
          v-model="userData.province"
          :options="canadianProvinces"
          placeholder="Select a Province"
          autocomplete="off"
          name="hidden"
          required
        ></vue-single-select>
    <h5 class="error" :class="{ active: provinceError }">A province must be selected.</h5>

    <label for="school">School</label>
    <vue-single-select
          inputId="school"
          v-model="userData.school"
          :options="schools"
          placeholder="Select a School"
          required
        ></vue-single-select>
    <h5 class="error" :class="{ active: schoolError }">A school must be selected.</h5>

    <a class="button primary" @click="signup()">Sign Up</a>
    <div class="switch">
      <a @click="switchAuth">already have an account?</a>
    </div>
  </div>
  <div v-else>
    <h3>Account successfully created!</h3>
    <a class="button primary" @click="switchAuth">Sign In</a>
  </div>
</template>

<script>

import firebase from 'firebase/app'
import 'firebase/auth'
import fb from '@/firebase'
import VueSingleSelect from 'vue-single-select'

export default {
  name: 'signup',
  data () {
    return {
      userData: {
        firstName: '',
        lastName: '',
        province: '',
        school: ''
      },
      email: '',
      password: '',
      passwordConfirmation: '',
      schools: [],
      canadianProvinces: [
        'Alberta',
        'British Columbia',
        'Manitoba',
        'New Brunswick',
        'Newfoundland and Labrador',
        'Northwest Territories',
        'Nova Scotia',
        'Nunavut',
        'Ontario',
        'Prince Edward Island',
        'Quebec',
        'Saskatchewan',
        'Yukon Territory'
      ],
      signupSuccess: false,
      nameError: false,
      emailError: false,
      emailErrorText: 'Valid email required.',
      passwordError: false,
      passwordConfirmationError: false,
      provinceError: false,
      schoolError: false
    }
  },
  created () {
    fb.getSchools(snapshot => {
      let raw = snapshot.val()
      for (let i = 0; i < raw.length; i++) {
        this.schools.push(raw[i].name)
      }
    })
  },
  methods: {
    switchAuth () {
      this.$emit('switched', 'login')
    },
    signup () {
      if (!this.userData.firstName || !this.userData.lastName) this.nameError = true
      else this.nameError = false

      if (!this.email || !this.validateEmail()) this.emailError = true
      else {
        this.emailErrorText = 'Valid email required.'
        this.emailError = false
      }

      if (!this.password || !this.validatePassword()) this.passwordError = true
      else this.passwordError = false

      if (!this.passwordConfirmation || !this.validatePasswordConfirmation()) this.passwordConfirmationError = true
      else this.passwordConfirmationError = false

      if (!this.userData.province) this.provinceError = true
      else this.provinceError = false

      if (!this.userData.school) this.schoolError = true
      else this.schoolError = false

      if (!this.nameError && !this.emailError && !this.passwordError && !this.passwordConfirmationError && !this.provinceError && !this.schoolError) {
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password).then(() => {
            fb.addUser(firebase.auth().currentUser.uid, this.userData)
            // this.$emit('switched', 'login')
            this.signupSuccess = true
          }).catch(error => {
            if (error.includes('email')) {
              this.emailError = true
              this.emailErrorText = error.message
            } else alert(error.message)
          })
      }
    },
    validateEmail: function () {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(this.email)
    },
    validatePassword: function () {
      return this.password.length > 5
    },
    validatePasswordConfirmation: function () {
      return this.password === this.passwordConfirmation
    }
  },
  components: {
    VueSingleSelect
  }
}
</script>
