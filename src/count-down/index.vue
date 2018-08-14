<template>
  <button :disabled="computedDisabled" class="ap-button-count" @click="clickHandle">
    <template v-if="counting">
      {{ countingText }}
    </template>
    <slot v-else></slot>
  </button>
</template>

<script>

/**
 * Count down component
 *
 * events: `count` `click`
 * @module component/count-down
 * @param {number} [count=60]
 * @param {string} text the couting template text. use `{0}` for the number. for example `{0} seconds left`
 * @param {number=} resume if set, the count-down will automatically start from the resume number
 * @param {boolean=} disabled force to disabled/enabled. if disabled is not set, it will be according to the couting state.
 * @example
 * <count-down text="left {0}s" :count="99">Click start</count-down>
 */
export default {
  props: {
    count: {
      type: Number,
      default: 60,
    },
    text: String,
    resume: {
      type: Number,
      default: 0,
    },
    disabled: {
      type: Boolean,
      default: null,
    },
  },

  data: () => ({
    counting: false,
    num: 0,
  }),

  computed: {
    countingText () {
      return this.text.replace('{0}', this.num)
    },

    computedDisabled () {
      if (this.disabled != null) return this.disabled
      return !!this.counting
    },
  },

  created () {
    if (this.resume) {
      this.start(this.resume)
    }
  },

  methods: {
    /**
     * start the count down
     * @method start
     * @param {number=} num the start number. default to `count` prop.
     */
    start (num) {
      this.reset()
      this.num = num || this.count
      this.counting = true
      this.timer = setInterval(() => {
        this.num--
        if (this.num === 0) {
          this.reset()
        }
        this.$emit('count', this.num)
      }, 1000)
    },

    reset () {
      this.counting = false
      clearInterval(this.timer)
    },

    clickHandle () {
      this.$emit('click')
    },
  },
}
</script>
