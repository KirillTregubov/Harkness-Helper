<template>
<body id="fullLayout">
  <header class="mainNav">
    <Header/>
  </header>
  <nav class="itemNav">
    <ul>
      <li :key="item.id" v-for="item in userObject.classes">
        <a>
          <div class="primary">{{item.name}}</div>
          <div class="secondary">{{item.code}}</div>
        </a>
      </li>
    </ul>
  </nav>
  <section class="itemContent">
    <Class :classId="selectedClass"/>
  </section>
</body>
</template>

<script>
import Api from '@/services/Api'
import Header from '@/components/Header.vue'
import Class from '@/components/Class.vue'

export default {
  name: 'main-layout',
  data: function () {
    return {
      user: 'Test',
      userObject: [],
      selectedClass
    }
  },
  created () {
    this.fetchUser(this.user)
  },
  methods: {
    async fetchUser (user) {
      const response = await Api.fetchUser(user)
      this.userObject = response.data
    }
  },
  components: {
    Header,
    Class
  }
}
</script>

<style lang="scss" scoped>
#fullLayout {
  display: grid;
  height: 100vh;
  grid-gap: 3px;
  grid-template-columns: 300px 1fr;
  grid-template-rows: 5vh 1fr; // 10vh;
  grid-template-areas:
    'header header'
    'nav    content';
  margin: 0 auto;

  @mixin pronounced-content {
    background-color: var(--neutral050);
    box-shadow: var(--shadow-deep);
  }

  .mainNav {
    grid-area: header;
    @include pronounced-content();
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .itemNav {
    grid-area: nav;
    padding: 1.5rem;

    ul {
      li {
        margin-bottom: 5px;
        padding: 0.5rem 1.5rem;
        border-radius: var(--border-radius);

        &:hover {
          background-color: var(--neutral200);
          border-radius: var(--shadow);
        }

        .primary {
          font-weight: var(--font-bold);
          font-size: var(--text-lg);
        }
        .secondary {
          color: var(--primary800);
        }
      }
    }
  }
  .itemContent {
    grid-area: content;
    @include pronounced-content();
    padding: 2rem;
    border-radius: var(--border-radius) 0 0 var(--border-radius);
  }
}

@include mq-max($width-m) {
  #fullLayout {
    grid-template-columns: 1fr;
    grid-template-rows: 5vh 5vh 1fr;
    grid-template-areas:
      'header'
      'nav'
      'content';

    .itemNav {
      padding: 1rem;
    }
  }
  nav ul {
    display: flex;
    justify-content: space-around;
  }
}
</style>
