<template>
  <div id="classPage" v-if="!selectedClass.isEmpty">
    <div class="title">
      <h1>{{ selectedClass.name }} ({{ selectedClass.classCode }} {{ selectedClass.year }})</h1>
        <router-link :to="{name: 'addHarkness', params: { classKey: Object.keys(selectedClass)[0] } }"><Icon name="icon-add-circle"/></router-link>
        <router-link to="/new/harkness"><Icon name="icon-dots-vertical"/></router-link>
    </div>
    <div class="details">
      <h3>Block {{ selectedClass.block }} | {{ selectedClass.students.length }} Students</h3>
    </div>
    <div class="list" v-if="selectedClass.harknesses.length > 0">
      <h3>Previous Harkness Tables</h3>
      <ul>
        <li v-for="harkness in selectedClass.harknesses">
          <div class="name">{{ harkness.name }}</div>
          <div class="date">{{ harkness.date }}</div>
        </li>
      </ul>
    </div>
    <div class="empty" v-else>
      <h3>You have no previous Harkness tables for this class. Please create a new Harkness table above.</h3>
      <VueSVG name="missing" size="0.4"/>
    </div>
    <div class="stats" v-if="Object.keys(selectedClass.stats).length > 0">
      <h3>Statistics Overview</h3>
      <div class="table">
        <div class="head">
          <h4>Skill</h4>
          <h4>Average Score</h4>
          <h4>KICA</h4>
        </div>
        <div class="content">
          <div class="row" v-for="stat in selectedClass.stats">
            <h4>{{ stat.title }}</h4>
            <h4>{{ stat.classScore }}</h4>
            <h4>{{ stat.kica }}</h4>
          </div>
        </div>
      </div>
      <!-- <table>
        <thead>
          <tr>
            <th>Skill</th>
            <th>Average Score</th>
            <th>KICA</th>
          </tr>
        </thead>
        <tbody>
          <tr :key="stat.id" v-for="stat in selectedClass.stats">
            <td>{{ stat.title }}</td>
            <td>{{ stat.classScore }}</td>
            <td>{{ stat.kica }}</td>
          </tr>
        </tbody>
      </table>-->
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
import VueSVG from '@/components/VueSVG.vue'
import Icon from '@/components/Icon.vue'

export default {
  name: 'class-view',
  props: {
    selectedClass: Object
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
  width: 100%;
  padding: 2rem;
  margin-bottom: 1rem;

  h3 {
    margin-top: 0;
    margin-bottom: 2rem;
    font-size: var(--text-lg);
  }
}

#classPage {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  // &.empty {
  //   h3 {
  //     @include container();
  //   }
  // }

  .title {
    font-size: var(--text-xl);
    display: flex;
    flex-direction: row;
    align-items: flex-end;

    h1 {
      margin: 0 1rem 0 0;
    }
    
    a {
      margin-left: 0.5rem;
      display: flex;
    }

    svg {
      &.icon-add-circle {
        margin-bottom: 2px;
        width: 2rem;
        height: 2rem;
      }

      &.icon-dots-vertical {
        width: 1.75rem;
        height: 1.75rem;
        margin-bottom: 4px;
      }
    }
  }

  .details {
    font-size: var(--text-lg);
  }

  .list {
    @include container();
    max-width: $width-xs;

    ul {
      li {
        display: flex;
        justify-content: space-between;

        .name {
          font-weight: var(--font-bold);
        }
      }

      :not(:last-child) {
        margin-bottom: 10px;
      }
    }
  }

  .stats {
    @include container();
    max-width: $width-sm;
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
      }

      .head {
        text-transform: uppercase;
        letter-spacing: 2px;
        background-color: var(--neutral100);
      }
    }
  }
}
</style>
