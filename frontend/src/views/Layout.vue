<template>
<body id="fullLayout" v-if="!isLoading">
  <header class="mainNav">
    <Header/>
  </header>

  <nav class="itemNav">
    <ul>
      <li
        :key="item.id"
        v-for="item in classes"
        :class="selectedClass === item ? 'active' : ''"
        @click="selectItem(item)"
      >
          <Icon name="icon-user-group"/>
          <div class="titles">
            <div class="primary">{{item.name}}</div>
            <div class="secondary">{{item.classCode}}</div>
          </div>
        <button @click="deleteClass(item)">Delete</button>
      </li>
      <li>
        <button @click="logout">logout</button>
        <router-link to="/new/class">
          <button>Add Class</button>
        </router-link>
      </li>
    </ul>
  </nav>

  <section class="itemContent">
    <Class :selectedClass="selectedClass !== '' ? selectedClass : {isEmpty: true}"/>
  </section>
</body>
<body id="loading" v-else>
  <div class="loader">
    <div></div>
  </div>
</body>
</template>

<script>
import firebase from 'firebase'
import fb from '@/firebase'
import Header from '@/components/General/TheHeader.vue'
import Class from '@/components/Class/Class.vue'
import Icon from '@/components/Iconography/Icon.vue'

export default {
  name: 'main-layout',
  data: function () {
    return {
      classes: [],
      selectedClass: '',
      isLoading: true
    }
  },
  mounted: function () {
    fb.getClasses(snapshot => {
        this.isLoading = false
        this.classes = snapshot.val()
        if (this.classes) {
          this.selectedClass = this.classes[Object.keys(this.classes)[0]]
        }
      })
  },
  methods: {
    selectItem: function (item) {
      this.selectedClass = item
    },
    deleteClass: function (item) {
      fb.deleteClass(item.key)
      this.$router.go()
    },
    logout: function () {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.go('')
        })
    }
  },
  components: {
    Header,
    Class,
    Icon
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
    "header header"
    "nav    content";
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
          box-shadow: var(--shadow-inset);
        }

        &.active {
          background-color: var(--neutral200);
          box-shadow: var(--shadow-inset);
        }

        svg {
          display: inline-block;
        }

        .titles {
          display: inline-block;
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
    max-height: 95vh;
    overflow: auto;
    padding: 2rem;
    border-radius: var(--border-radius) 0 0 var(--border-radius);
    display: flex;
    justify-content: center;
  }
}

@include mq-max($width-md) {
  #fullLayout {
    grid-template-columns: 1fr;
    grid-template-rows: 5vh auto 1fr;
    grid-template-areas:
      "header"
      "nav"
      "content";

    .itemNav {
      padding: 1rem;

      ul {
        display: flex;
        flex-wrap: wrap;
        // justify-content: space-between;

        li {
          margin-bottom: 0;
          margin-right: 5px;
          padding: 0.25rem 1rem;
          border-radius: var(--border-radius);

          &:hover {
            background-color: var(--neutral200);
            box-shadow: var(--shadow-inset);
          }
          &.active {
            background-color: var(--neutral200);
            box-shadow: var(--shadow-inset);
          }

          .primary {
            display: none;
          }
          .secondary {
            font-weight: var(--font-bold);
            font-size: var(--text-lg);
            color: inherit;
          }
        }
      }
    }

    .itemContent {
      border-radius: var(--border-radius) var(--border-radius) 0 0;
    }
  }
}
</style>
