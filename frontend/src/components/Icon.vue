<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 24 24"
    :class="name"
    :width="size + 'rem'"
    :height="size + 'rem'"
  >
    <IconAddCircle v-if="name === 'icon-add-circle'" />
    <IconCloseCircle v-else-if="name === 'icon-close-circle'" />
    <IconCog v-else-if="name === 'icon-cog'" />
    <IconDoorEnter v-else-if="name === 'icon-door-enter'" />
    <IconDoorExit v-else-if="name === 'icon-door-exit'" />
    <IconDotsVertical v-else-if="name === 'icon-dots-vertical'" />
    <IconEdit v-else-if="name === 'icon-edit'" />
    <IconMoodHappy v-else-if="name === 'icon-mood-happy'" />
    <IconMoodNeutral v-else-if="name === 'icon-mood-neutral'" />
    <IconMoodSad v-else-if="name === 'icon-mood-sad'" />
  </svg>
</template>

<script>
import IconAddCircle from '@/assets/icons/icon-add-circle.vue'
import IconCloseCircle from '@/assets/icons/icon-close-circle.vue'
import IconCog from '@/assets/icons/icon-cog.vue'
import IconDoorEnter from '@/assets/icons/icon-door-enter.vue'
import IconDoorExit from '@/assets/icons/icon-door-exit.vue'
import IconDotsVertical from '@/assets/icons/icon-dots-vertical.vue'
import IconEdit from '@/assets/icons/icon-edit.vue'
import IconMoodHappy from '@/assets/icons/icon-mood-happy.vue'
import IconMoodNeutral from '@/assets/icons/icon-mood-neutral.vue'
import IconMoodSad from '@/assets/icons/icon-mood-sad.vue'

export default {
  name: 'vue-svg',
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
    IconAddCircle,
    IconCloseCircle,
    IconCog,
    IconDoorEnter,
    IconDoorExit,
    IconDotsVertical,
    IconEdit,
    IconMoodHappy,
    IconMoodNeutral,
    IconMoodSad
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
