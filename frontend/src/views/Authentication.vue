<template>
  <body>
    <section>
      <Login v-if="view === 'login'" @switched="switchAuth"/>
      <Signup v-else @switched="switchAuth" />
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

<style lang="scss" scoped>
.small-block-layout {
  // small center block (login)
  margin: 20vh 20vw;
}

</style>
