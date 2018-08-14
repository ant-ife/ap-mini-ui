<!--
  Samples:

  // render directly
  <super-button type="ghost">ghost</super-button>
  <super-button status="loading">Loading...</super-button>

  // change status
  <super-button ref="button">button</super-button>
-->

<template>
  <button
    @click="clickHandler"
    type="button"
    :class="'ap-button ap-button-' + type"
    :disabled="status !== 'normal'"
    :seed="seed">
    <slot v-if="status === 'normal'"></slot>
    <spin v-if="status === 'loading'"></spin>
    <icon v-if="status === 'finished'" name="ok"></icon>
    <slot v-if="status === 'disabled'"></slot>
  </button>
</template>

<script>
import spin from '../spin'
import icon from '../icon'

/**
 * The button component
 *
 * events: `click`
 * @module component/super-button
 * @param {string} type button type. 'primary' 'ghost'
 * @param {string} status button status. 'normal' 'loading' 'finished'
 * - `normal` - normal button
 * - `loading` - loading button
 * - `finished` - button with a ok button indicating for success
 */
export default {
  props: {
    seed: String,
    type: {
      type: String,
      default: 'primary', // ghost
    },
    status: {
      type: String,
      default: 'normal', // loading, finished
    },
  },

  components: {
    spin,
    icon,
  },

  methods: {
    clickHandler () {
      this.$emit('click')
    },
  },
}
</script>
