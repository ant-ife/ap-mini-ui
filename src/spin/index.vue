<template>
  <icon name="spin" :class="paused ? '' : 'ap--spinning'"></icon>
</template>

<script>
import icon from '../icon'

/**
 * @module component/spin
 * @param {boolean} [paused=false]
 */
export default {
  props: {
    paused: Boolean,
  },

  components: {
    icon,
  },
}
</script>
