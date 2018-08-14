<template>
  <input
    type="checkbox"
    class="ap-switcher"
    :disabled="disabled"
    :checked="checked"
    @change="handleChange" />
</template>

<script>

/**
 * A beautiful checkbox
 * @module component/switcher
 * @param {boolean} [disabled=false]
 * @param {boolean} [checked=false]
 * @example
 * <switcher v-model="checked" />
 */
export default {
  model: {
    prop: 'checked',
    event: 'change',
  },

  props: {
    disabled: Boolean,
    checked: Boolean,
  },

  methods: {
    handleChange (e) {
      this.$emit('change', e.target.checked)
    },
  },
}
</script>
