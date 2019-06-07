<template>
  <body class="informational">
    <section class="container">
      <div class="title">
        <div class="back" @click="goBack()">
          <Icon name="icon-cheveron-left-circle" size="1.6" />
          <h2>Go Back</h2>
        </div>
        <h1>Project Harkness Edsby Tool</h1>
      </div>
      <h3>Authors: Alex Alexiev, Charlotte Volk, Kirill Tregubov</h3>
      <h4>Current version: 1.0</h4>
      <h4>Supported schools:</h4>
      <ol :key="school.id" v-for="school in schools">
          <li>{{ school }}</li>
      </ol>
      <h3>Description</h3>
      <p>A tool used to fetch data from Edsby Class pages of schools supported by the Project Harkness service.</p>
      <p></p>
      <h4>Project Harkness</h4>
      <p>Project Harkness is a Harkness table tracking tool made by high school seniors for our ICS4U course.</p>
      <p>This tool allows high school teachers from any subject area to track Harkness tables for each of their classes.</p>
    </section>
  </body>
</template>

<script>
import fb from '@/firebase'
import Icon from '@/components/Iconography/Icon.vue'

export default {
  name: 'extension-view',
  data: function () {
    return {
      schools: []
    }
  },
  created () {
    fb.getSchools(snapshot => {
      let raw = snapshot.val()
      for (let i = 0; i < raw.length; i++) {
        this.schools.push(raw[i].name)
      }
    })
  },
  methods: {
    goBack () {
      window.history.back()
    }
  },
  components: {
    Icon
  }
}
</script>
