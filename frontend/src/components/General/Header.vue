<template>
  <nav class="main">
    <ul>
      <li class="left static">
        <h1>Hello, {{ name }}</h1>
        <Icon name="icon-user-circle" size="1.6875"/></li>
      <li>
        <Icon name="icon-information" size="1.6875"/>
        <h1>About Us</h1>
      </li>
      <li>
        <Icon name="icon-cog" size="1.6875"/>
        <h1>Settings</h1>
      </li>
      <li @click="logout()">
        <Icon name="icon-door-exit" size="1.6875"/>
        <h1>Log Out</h1>
      </li>
    </ul>
  </nav>
</template>

<script>
import Icon from '@/components/Iconography/Icon.vue'
import firebase from 'firebase'
import fb from '@/firebase'

export default {
  name: 'main-header',
  data () {
    return {
      name: ''
    }
  },
  components: {
    Icon
  },
  mounted () {
    fb.getUserData(snapshot => { this.name = snapshot.val().name })
  },
  methods: {
    logout () {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.go('')
        })
    }
  }
}
</script>

<style lang="scss">
nav.main {
  height: 100%;
  width: 100%;

  ul {
    display: flex;
    align-items: center;
    height: calc(100% - 1rem);
    padding: 0.5rem 1.5rem;

    li {
      display: flex;
      align-items: center;
      margin-left: 1.5rem;
      padding: 0.175rem 0.75rem 0.3rem 0.5rem;
      border-radius: var(--border-radius);
      user-select: none;

      &:hover:not(.static) {
        background-color: var(--neutral200);
        box-shadow: var(--shadow-inset);
      }

      &.active {
        background-color: var(--neutral200);
        box-shadow: var(--shadow-inset);
      }

      &.left {
        margin: 0 auto 0 0;

        svg {
          margin: 0 0 0 0.25rem;
        }
      }

      h1 {
        margin: 0;
        font-size: var(--text-lg);
        font-weight: var(--font-bold);
      }

      svg {
        margin: 0.125em 0.25rem 0 0;

        &.standalone {
          margin-left: 0;
        }

        .primary {
          fill: var(--neutral300);
        }

        .secondary {
          fill: var(--neutral900);
        }
      }
    }
  }
}

</style>
