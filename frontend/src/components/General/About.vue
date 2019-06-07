<template>
<body class="informational" v-if="!isLoading">
  <section class="container">
    <div class="title">
      <div class="back" @click="goBack()">
        <Icon name="icon-cheveron-left-circle" size="1.6" />
        <h2>Go Back</h2>
      </div>
      <h1>About Us</h1>
    </div>
    <div class="subtitle">
      <h2 class="authors">Created by Alex Alexiev, Kirill Tregubov, Charlotte Volk</h2>
      <h2 class="version">Currently v1.0</h2>
    </div>
    <h3>Supported Schools</h3>
    <ol :key="school.id" v-for="school in schools">
        <li>{{ school }}</li>
    </ol>
    <h3>About the Tool</h3>
    <div class="text">
      <p>Harkness Helper is a Harkness table tracking tool made by high school seniors for our ICS4U course.</p>
      <p>This tool allows high school teachers from any subject area to track Harkness tables for each of their classes.</p>
      <p>Teachers can customize tracking by adding the skills they want to assess for each Harkness table.</p>
      <p>Student marks (in the format of levels from 1 to 4) can be inputted during the Harkness table, and class averages are accessible to the teacher.</p>
    </div>

    <h3>Get in Touch</h3>
    <div class="contactContainer">
      <div class="contact" :key="author.id" v-for="author in authors">
        <h4 class="name">{{ author.name }}</h4>
        <a class="email" :href="'mailto:' + author.email + '?subject=Inquiry regarding Harkness Helper'">{{ author.email }}</a>
      </div>
    </div>
  </section>
</body>
<body id="loading" v-else>
  <div class="loader">
    <div></div>
  </div>
</body>
</template>

<script>
import fb from '@/firebase'
import Icon from '@/components/Iconography/Icon.vue'

export default {
  name: 'about-view',
  data: function () {
    return {
      schools: [],
      isLoading: true,
      authors: [
        {
          name: 'Alex Alexiev',
          email: 'aalexiev@bayviewglen.ca'
        },
        {
          name: 'Kirill Tregubov',
          email: 'contact@kirilltregubov.com'
        },
        {
          name: 'Charlotte Volk',
          email: 'cvolk@bayviewglen.ca'
        }
      ]
    }
  },
  created () {
    fb.getSchools(snapshot => {
      let raw = snapshot.val()
      for (let i = 0; i < raw.length; i++) {
        this.schools.push(raw[i].name)
      }
      this.isLoading = false
    })
  },
  methods: {
    goBack () {
      this.$router.push('/dashboard')
    }
  },
  components: {
    Icon
  }
}
</script>
