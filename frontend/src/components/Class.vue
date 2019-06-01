<template>
  <div id="classPage" v-if="!selectedClass.isEmpty">
    <h1>{{ selectedClass.name }} ({{ selectedClass.classCode }})</h1>
    <span>
      <h3>Block {{ selectedClass.block }} | {{ selectedClass.students.length }} Students</h3>
    </span>
    <div id="harknesses" v-if="selectedClass.harkness.length > 0">
      <table>
        <tr>
          <th>Harkness Tables</th>
          <th>Date</th>
        </tr>
        <tr :key="harkness.id" v-for="harkness in selectedClass.harkness">
          <td>{{ harkness.name }}</td>
          <td>{{ harkness.date }} </td>
        </tr>
      </table>
    </div>
    <div v-else>
      <h4>You have no previous Harkness tables for this class. Please create a new Harkness table above.</h4>
      <!-- <Icon name="missing" height="50" width="20"/> -->
    </div>
    <div id="classStats" v-if="selectedClass.stats.length > 0">
      <table>
        <tr>
          <th>Skill</th>
          <th>Class Score</th>
        </tr>
      </table>
      
    </div>
    <div v-else>
      <h4>You have no previous stats for this class. Please create a new Harkness table above to start tracking stats.</h4>
    </div>
  </div>
  <div v-else>
    <h4>You do not have any classes yet. Please create a class above.</h4>
  </div>
</template>

<script>
// import Icon from '@/components/Icon.vue'

export default {
  name: 'class-view',
  props: {
    selectedClass: Object
  },
  components: {
    // Icon
  }
}
</script>

<style lang="scss" scoped>
</style>
