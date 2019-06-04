<template>
  <body id="notFound">
    <section class="container">
      <h1 class="title">Oops! Looks like you tried to go somewhere that doesn't exist...</h1>
      <div class="buttons">
        <router-link class="button" to="/dashboard">Go Home</router-link>
        <a class="button" @click="goBack()">Go Back</a>
      </div>
      <VueSVG name="page-not-found" size="0.4"/>
    </section>
  </body>
</template>

<script>
import VueSVG from '@/components/VueSVG.vue'

export default {
  name: 'not-found',
  methods: {
    goBack() {
      window.history.back();
    }
  },
  components: {
    VueSVG
  }
}
</script>

<style lang="scss" scoped>
#notFound {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  .container {
    background-color: var(--neutral050);
    box-shadow: var(--shadow-deep-sm);
    border-radius: var(--border-radius);
    padding: 2rem;
    margin-bottom: 1rem;
    max-width: 80vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .title {
      text-align: center;
      font-size: var(--text-xl);
    }

    .buttons {
      margin: 1rem;
      display: flex;
      flex-direction: row;

      > * {
        margin: 0 1rem;
      }
    }

    svg {
      margin: 0.5rem;
    }
  }
}

@include mq-max($width-sm) {
  #notFound {
    .container {
      svg {
        width: calc(100% - 10vw);
      }
    }
  }
}

@include mq-max($width-xs) {
  #notFound {
    .container {
      .buttons {
        flex-direction: column !important;
        flex-wrap: nowrap;
        align-items: center;
        justify-content: center;

        > * {
          margin: 1rem 0;
          
          &:last-child{
            margin-top: 0;
          }
        }
      }

      svg {
        height: 150px;
        width: calc(100% - 10vw);
      }
    }
  }
}

// .small-block-layout {
//   // small center block (login)
//   margin: 20vh 20vw;
// }

</style>
