<template>
    <div id="harknessOverviewPage" v-if="Object.keys(selectedHarkness).length > 0">
        <h1>{{ selectedHarkness.name }} | {{ selectedHarkness.date }}</h1>
        <table>
            <tr>
                <th>Student Name</th>
                <th>Harkness Score</th>
            </tr>
            <!-- <tr v-for="name in GET NAME FROM CLASS FOR HARKNESS HERE">
                <td>{{ selectedClass.name }}</td>
                <td>{{ selectedClass.harknessScore COMPUTED FROM AVERAGE SCORE FOR ALL SKILLS }}</td>
            </tr> -->
        </table>
    </div>
</template>

<script>
// import Icon from '@/components/Icon.vue'

export default {
  name: 'harkness-info',
  props: {
    selectedHarkness: Object
  },
  components: {
    // Icon
  }
}
</script>

<style lang="scss" scoped>

</style>
