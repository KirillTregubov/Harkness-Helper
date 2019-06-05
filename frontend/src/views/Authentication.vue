<template>
  <body id="authentication">
    <section>
      <div class="heading">
        <div class="title">
          <img class="logo" src="@/assets/images/logo.png" alt="Project Harkness Logo">
          <h1 class="name">Project Harkness</h1>
        </div>
        <h2 class="subtitle">A web tool used to track harkness tables, designed with high school teachers in mind.</h2>
      </div>
      <div class="container">
        <Login v-if="view === 'login'" @switched="switchAuth"/>
        <Signup v-else @switched="switchAuth" />
      </div>
    </section>
  </body>
</template>

<script>
import Login from '@/components/Login.vue'
import Signup from '@/components/Signup.vue'

export default {
  name: 'focused-layout',
  data: function () {
    return {
      view: 'login'
    }
  },
  methods: {
    switchAuth (value) {
      if (value === 'login') {
        this.view = 'login'
      } else {
        this.view = 'signup'
      }
    }
  },
  components: {
    Login,
    Signup
  }
}
</script>

<style lang="scss">

#authentication {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  > * {
    max-width: 400px;
    width: 80vw;
    min-width: 300px;
  }

  .heading {
    .title {
      display: flex;
      align-content: flex-end;
      justify-content: center;
    }

    .logo {
      display: inline-flex;
      align-self: flex-end;
      width: 1.8em;
      margin-right: 0.5rem;
    }

    .name {
      font-size: var(--text-2xl);
      margin: 0;
    }

    .subtitle {
      font-size: var(--text-lg);
      color: var(--primary800);
      text-align: center;
    }
  }

  .container {
    background-color: var(--neutral050);
    box-shadow: var(--shadow-deep-sm);
    border-radius: var(--border-radius);
    padding: 2rem;
    margin-bottom: 1rem;

    h3 {
      margin: 0 0 1em 0;
    }

    label {
      display: block;
      color: var(--primary800);
      margin-bottom: 0.25em;
    }

    input {
      box-sizing: border-box;
      border: 1px solid #C2C2C2;
      background-color: var(--neutral200);
      box-shadow: 1px 1px 4px #EBEBEB;
      border-radius: 3px;
      padding: 0.5rem;
      width: 100%;
      outline: none;
      margin-bottom: 1em;
      transition: all ease 0.5s;

      &:hover {
        background-color: var(--neutral100);
      }
    }

    .switch {
      margin-left: 1em;
      display: inline;
    }
  }
}

</style>
