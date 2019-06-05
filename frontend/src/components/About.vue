<template>
    <body>
        <h1>Project Harkness</h1>
        <h4>Authors: Alex Alexiev, Charlotte Volk, Kirill Tregubov</h4>
        <h4>Current version: 1.0</h4>
        <h4>Supported schools:</h4>
        <div :key="school.id" v-for="school in schoolsArray">
            <p>{{ school }}</p>
        </div>
        <h2>Description</h2>
        <p>Project Harkness is a Harkness table tracking tool made by high school seniors for our ICS4U course.</p>
        <p>This tool allows high school teachers from any subject area to track Harkness tables for each of their classes.</p>
        <p>Teachers can customize tracking by adding the skills they want to assess for each Harkness table.</p>
        <p>Marks (in the format of levels from 1 to 4+) can be inputted during the Harkness table, and averages for individual students, as well as class averages, are accessible to the teacher.</p>
    </body>
</template>

<script>
export default {
    data: function () {
    return {
      schoolsArray: ['Bayview Glen Independent School']
    }
  },
    // methods: {

    // }
}
</script>
