<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    :viewBox="viewbox"
    :width="width"
    :height="height"
  >
    <Missing v-if="name === 'missing'" />
  </svg>
</template>

<script>
import Missing from '@/components/icons/Missing.vue'

export default {
  computed: {
    viewbox: function () {
      if (this.name === 'missing') return '0 0 1009.54 789.93'
      else return '0 0 0 0'
    },
    width: function () {
      if (this.name === 'missing') return this.size * 1009.54 + 'px'
      else return '0px'
    },
    height: function () {
      if (this.name === 'missing') return this.size * 789.93 + 'px'
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
    Missing
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
