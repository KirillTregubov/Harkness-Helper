<template>
  <div id="classPage" v-if="!selectedClass.isEmpty">
    <div class="title">
      <h1>{{ selectedClass.name }}</h1>
        <router-link :to="{name: 'add-harkness', params: { classKey: selectedClass.key } }"><Icon name="icon-add-circle"/></router-link>
        <router-link :to="{name: 'edit-class', params: { classKey: selectedClass.key } }"><Icon name="icon-dots-vertical"/></router-link>
    </div>
    <div class="details">
      <!-- change this -->
      <h3>{{ selectedClass.classCode }} | {{ selectedClass.year }} Year |<span v-if="selectedClass.block"> Block {{ selectedClass.block }}</span><span v-if="selectedClass.students"> | {{ selectedClass.students.length }} Students</span><span v-else> | No Students</span></h3>
    </div>
    <div class="list" v-if="selectedClass.harknesses">
      <h3>Previous Harkness Tables</h3>
      <ul>
          <li :key="harkness.id"  v-for="harkness in selectedClass.harknesses">
            <!-- harkness key or id -->
            <router-link :to="{name: 'view-harkness', params: { classKey: selectedClass.key, harknessKey: harkness.key} }">
              <h4 class="name">{{ harkness.name }}</h4>
              <h4 class="date">{{ harkness.date }}</h4>
            </router-link>
            <button type="button" id="deleteHarkness" @click="removeHarkness(harkness.key)">Delete</button>
          </li>
      </ul>
    </div>
    <div class="empty" v-else>
      <h3>There are no recorded Harkness tables in this class. Create one to get started.</h3>
      <VueSVG name="missing" size="0.35"/>
    </div>
    <div class="stats" v-if="selectedClass.harknesses">
      <div id="averageKICA">
        <span>K: {{KICAavg.K}}</span>
        <span>I: {{KICAavg.I}}</span>
        <span>C: {{KICAavg.C}}</span>
        <span>A: {{KICAavg.A}}</span>

      </div>
      <div id="randomComments">
        <!-- <p> Mahrh.random(comments0) </p> -->
      </div>
    </div>
    <div class="empty" v-else>
      <h3>You have no previous stats for this class. Please create a new Harkness table above to start tracking stats.</h3>
      <VueSVG name="missing" size="0.4"/>
    </div>
  </div>
  <div id="classPage" class="empty" v-else>
    <h3>You do not have any classes yet. Please create a class above.</h3>
  </div>
</template>

<script>
import VueSVG from '@/components/Iconography/VueSVG.vue'
import Icon from '@/components/Iconography/Icon.vue'
import fb from '@/firebase'

export default {
  data () {
    return {
      KICAavg: ''
    }
  },
  name: 'class-view',
  props: {
    selectedClass: Object
  },
  methods: {
    removeHarkness: function (harknessKey) {
      fb.deleteHarkness(this.selectedClass.key, harknessKey)
      this.$router.go()
    },
    computeKICAavg () {
      let KICAsum = { 'K': 0, 'I': 0, 'C': 0, 'A': 0 }
      let KICAcounter = { 'K': 0, 'I': 0, 'C': 0, 'A': 0 }

      // for loops are done normally, not this way
      // for (harknessTable in this.selectedClass.harknesses) {
      //   for (student in harknessTable.students) {
      //     console.log(student)
      //   }
      // }
    }
  },
  mounted () {
    if (this.selectedClass.harknesses) this.computeKICAavg()
  },
  components: {
    VueSVG,
    Icon
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
  margin-bottom: 1rem;

  h3 {
    margin-top: 0;
    margin-bottom: 1rem;
    font-size: var(--text-lg);
  }
}

#classPage {
  display: flex;
  flex-direction: column;
  align-items: center;

  .empty {
    @include container();
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .title {
    display: flex;
    flex-direction: row;
    align-items: center;

    h1 {
      margin: 0 1rem 0 0;
      font-size: var(--text-2xl);
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
