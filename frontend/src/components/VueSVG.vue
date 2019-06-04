<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    :viewBox="viewbox"
    :width="width"
    :height="height"
  >
    <Missing v-if="name === 'missing'" />
    <PageNotFound v-if="name === 'page-not-found'" />
  </svg>
</template>

<script>
import Missing from '@/assets/svgs/Missing.vue'
import PageNotFound from '@/assets/svgs/PageNotFound.vue'

export default {
  name: 'vue-svg',
  computed: {
    viewbox: function () {
      if (this.name === 'missing') return '0 0 1009.54 789.93'
      else if (this.name === 'page-not-found') return '0 0 1074.392 584.231'
      else return '0 0 0 0'
    },
    width: function () {
      if (this.name === 'missing') return this.size * 1009.54 + 'px'
      else if (this.name === 'page-not-found') return this.size * 1074.392 + 'px'
      else return '0px'
    },
    height: function () {
      if (this.name === 'missing') return this.size * 789.93 + 'px'
      else if (this.name === 'page-not-found') return this.size * 584.231 + 'px'
      else return '0px'
    }
  },
  props: {
    size: {
      type: [Number, String],
      default: 1
    },
    name: {
      type: String,
      default: ''
    }
  },
  components: {
    Missing,
    PageNotFound
  }
}
</script>

<style lang="scss">
.primary {
  fill: var(--white);
}

.secondary {
  fill: var(--black);
}
</style>
