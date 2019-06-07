<template>
  <section id="classPage" v-if="selectedClass">
    <div class="title">
      <h1>{{ selectedClass.name }}</h1>
        <router-link to="/new/harkness"><Icon name="icon-add-circle"/></router-link>
        <router-link to="/edit/class"><Icon name="icon-dots-vertical"/></router-link>
    </div>

    <div class="details">
      <h3>{{ selectedClass.courseCode }} | {{ selectedClass.year }} Academic Year <!--<span v-if="currentYear()">{{ selectedClass.year }} Academic Year</span><span v-else></span> -->
      <span v-if="selectedClass.block"> | Block {{ selectedClass.block }}</span> | {{ selectedClass.students.length }} Student<span v-if="selectedClass.students.length > 1">s</span></h3>
    </div>

    <div class="content" v-if="selectedClass.harknesses">
      <div class="list" v-if="selectedClass.harknesses">
        <h3>Previous Harkness Tables</h3>
        <ul>
            <li :key="harkness.id"  v-for="harkness in selectedClass.harknesses">
              <!-- harkness key or id -->
              <a @click="openHarkness(harkness.key)">
                <h4 class="name">{{ harkness.name }}</h4>
                <h4 class="date">{{ harkness.date }}</h4>
              </a>
              <!-- <router-link to="/view/harkness" @click="console.log(harkness.key)">
                <h4 class="name">{{ harkness.name }}</h4>
                <h4 class="date">{{ harkness.date }}</h4>
              </router-link> -->
            </li>
        </ul>
      </div>

      <div class="stats">
        <ClassStats :selectedClass="selectedClass"/>
      </div>
    </div>
    <div class="empty" v-else>
      <h3>There are no recorded Harkness tables in this class. Create one to get started.</h3>
      <VueSVG name="missing" size="0.35"/>
    </div>
  </section>
  <section v-else>
    <div class="empty">
      <h3>You don't have any classes. Create one to get started.</h3>
      <VueSVG name="missing" size="0.35"/>
    </div>
  </section>
</template>

<script>
import fb from '@/firebase'
import { mapGetters, mapActions } from 'vuex'
import VueSVG from '@/components/Iconography/VueSVG.vue'
import Icon from '@/components/Iconography/Icon.vue'
import ClassStats from '@/components/Class/ClassStats.vue'

export default {
  name: 'class-view',
  computed: {
    ...mapGetters([
      'getClassKey',
      'getHarknessKey'
    ])
  },
  props: {
    selectedClass: Object
  },
  methods: {
    /*currentYear () {
      var date = new Date()
      var year1 = date.getFullYear()
      var year2 = year1 + 1

      // if (selectedClass.year)
    },*/
    openHarkness (key) {
      this.setHarknessKey(key) 
      this.$router.push({name: "view-harkness"})
    },
    ...mapActions([
      'setHarknessKey'
    ])
  },
  mounted () {

  },
  components: {
    VueSVG,
    Icon,
    ClassStats
  }
}
</script>

<style lang="scss" scoped>
@mixin container() {
  background-color: var(--neutral050);
  box-shadow: var(--shadow-deep-sm);
  border-radius: var(--border-radius);
  max-width: $width-sm;
  width: 100%;
  padding: 2rem;
  margin-bottom: 1.5rem;

  h3 {
    margin-top: 0;
    margin-bottom: 1rem;
    font-size: var(--text-lg);
  }
}

.empty {
  padding: 2rem;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  h3 {
    margin-top: 0;
    margin-bottom: 1.5rem;
    font-size: var(--text-lg);
  }
}

#classPage {
  display: flex;
  flex-direction: column;
  align-items: center;

  .title {
    display: flex;
    flex-direction: row;
    align-items: center;
    user-select: auto;

    h1 {
      margin: 0 1rem 0 0;
      font-size: var(--text-2xl);
      font-weight: var(--font-black);
    }

    a {
      margin: 0.25rem 0 0 0.5rem;
      display: flex;
    }

    svg {
      &.icon-add-circle {
        width: 2rem;
        height: 2rem;
      }

      &.icon-dots-vertical {
        width: 1.75rem;
        height: 1.75rem;
      }
    }
  }

  .details {
    h3 {
      font-size: var(--text-lg);
      font-weight: var(--font-bold);
    }
  }

  .list {
    @include container();

    ul {
      li {
        padding: 0.5rem;

        &:hover {
          background-color: var(--neutral200);
          border-radius: var(--border-radius);
        }

        &:not(:last-child) {
          margin-bottom: 0.5rem;
        }

        a {
          display: flex;
          justify-content: space-between;

          h4 {
            font-weight: var(--font-normal);
            margin: 0;

            &.name {
              font-weight: var(--font-bold);
            }
          }
        }
      }
    }
  }

  .stats {
    @include container();
    text-align: left;

    .table {
      box-shadow: var(--shadow-deep-sm);
      border-radius: var(--border-radius);
      width: 100%;

      h4 {
        padding-left: 0.5rem;
        margin: 1rem 0;
      }

      > .head,
      > .content .row {
        padding: 0.25rem;
        display: grid;
        grid-gap: 0.5rem;
        grid-template-columns: 2fr 1fr 0.5fr;
        grid-template-rows: 1fr;

        h4 {
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }

      .head {
        text-transform: uppercase;
        letter-spacing: 2px;
        background-color: var(--neutral100);
      }
    }
  }
}

@include mq-max($width-sm) {
  #classPage {
    .title {
      align-items: center;
    }
  }
}
</style>
