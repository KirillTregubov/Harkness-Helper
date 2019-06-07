<template>
<body id="authentication">
  <section>
    <div class="heading">
      <div class="title">
        <img class="logo" src="@/assets/images/logo.png" alt="Harkness Helper Logo">
        <h1 class="name">Harkness Helper</h1>
      </div>
      <h2 class="subtitle">A web tool used to track harkness tables, designed with high school teachers in mind.</h2>
    </div>
    <div class="container">
      <Login @switched="switchAuth" v-if="view === 'login'" />
      <Signup @switched="switchAuth" v-else/>
    </div>
  </section>
</body>
</template>

<script>
import Login from '@/components/Authentication/Login.vue'
import Signup from '@/components/Authentication/Signup.vue'

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
      align-items: center;
      justify-content: center;
    }

    .logo {
      display: inline-flex;
      width: 1.8em;
      margin-right: 0.5rem;
    }

    .name {
      font-size: var(--text-2xl);
      margin: 0;
    }

    .subtitle {
      font-size: var(--text-md);
      color: var(--primary800);
      text-align: center;
      margin-bottom: 1.5rem;
    }
  }

  .container {
    max-height: 90vh;
    background-color: var(--neutral050);
    box-shadow: var(--shadow-deep-sm);
    border-radius: var(--border-radius);
    padding: 2rem;
    margin-bottom: 1rem;

    h3 {
      margin: 0 0 1em 0;
      font-size: var(--text-lg);
    }

    label {
      display: block;
      color: var(--primary800);
      margin-bottom: 0.25em;
    }

    h5.error {
      display: none;
      color: var(--primary600);
      transition: all 500ms linear;
      animation: shake 0.5s cubic-bezier(.36, .07, .19, .97) both;
      transform: translate3d(0, 0, 0);
      backface-visibility: hidden;
      margin: 0 0 1rem 0;

      &.active {
        display: block;
      }
    }

    input {
      box-sizing: border-box;
      border: 1px solid #c2c2c2;
      background-color: var(--neutral200);
      box-shadow: 1px 1px 4px #ebebeb;
      border-radius: 3px;
      padding: 0.5rem;
      width: 100%;
      outline: none;
      margin-bottom: 1em;
      line-height: 20px;
      transition: all ease 0.5s;
      font-size: var(--text-md);

      &:hover {
        background-color: var(--neutral100) !important;
      }

      &:-webkit-autofill,
      &:-webkit-autofill:hover,
      &:-webkit-autofill:focus {
        box-shadow: 0 0 0 50px var(--neutral100) inset;
      }
    }

    .single-select-wrapper {
      margin-bottom: 1rem;

      input.search-input {
        margin-bottom: 0;
      }

      ul {
        max-height: 160px !important;
        font-size: var(--text-md);

        li.active {
          background-color: var(--neutral100);
        }
      }
    }

    .split {
      > :first-child {
        margin-right: 0.5rem;
      }
      input {
        width: calc(50% - 0.25rem);
      }
    }

    .switch {
      margin-left: 1em;
      display: inline;
      user-select: none;
      font-weight: var(--font-normal);

      &:hover {
        font-weight: var(--font-bold);
      }
    }
  }
}

@include mq-max($width-xs) {
  #authentication {
    .container {
      .switch {
        display: block;
        margin: 0.5rem 0 0 0;
      }
    }
  }
}

@keyframes shake {
  20%,
  40%,
  60%,
  80% {
    transform: translate3d(3px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-3px, 0, 0);
  }
}
</style>
