<template>
  <div class="login">
    <h3>Sign In</h3>
    <input type="text" v-model="email" placeholder="Email">
    <br>
    <input type="text" v-model="password" placeholder="Password">
    <br>
    <button @click="login">log in</button>
    <p>
      <router-link to="/signup">create account</router-link>
    </p>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "login",
  date() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    login: function() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          (user) => {
            this.$router.replace('class')
          },
          (err) => {
            alert("it didn't work" + err.message);
          }
        );
    }
  }
};
</script>

<style scoped>
</style>

