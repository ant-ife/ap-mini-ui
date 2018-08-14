<template>
  <div class="ap-button-container ap--follow">
    <count-down
      class="ap-button ap-button-primary"
      @click="handleClick"
      ref="countDown"
      text="count down({0})"
    >click count down</count-down>
  </div>
</template>

<script>
import CountDown from '..'

export default {
  components: {
    CountDown,
  },

  methods: {
    handleClick () {
      this.$refs.countDown.start()
    },
  },
}
</script>
