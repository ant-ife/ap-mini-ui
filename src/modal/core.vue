<template>
  <transition name="ap-alert">
    <div :class="['ap-modal', className]" role="dialog">
      <div class="ap-modal-mask"></div>
      <div class="ap-modal-wrap">
        <div class="ap-modal-content">
          <div class="ap-modal-header" v-if="title">{{ title }}</div>
          <slot></slot>
        </div>
        <div class="ap-modal-button" v-if="showText(okText) || showText(cancelText)">
          <a
            v-if="showText(cancelText)"
            @click="onCancelClick"
            :href="cancelHref"
          >
            {{ cancelText }}
          </a>
          <a
            v-if="showText(okText)"
            @click="onOkClick"
            :href="okHref"
          >
            {{ okText }}
          </a>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
/**
 * The core component that drives modal
 *
 * events: `ok` `cancel`
 * @module component/mocal-core
 * @param {string} title the modal title
 * @param {string=} okText text of ok button, set `false` to hide the button
 * @param {string=} cancelText text of cancel button, set `false` to hide the button
 * @param {string=} okHref
 * @param {string=} cancelHref
 * @param {template} slot the main content
 * @param {string=} className
 */
export default {
  props: {
    title: String,
    okText: [String, Boolean],
    cancelText: [String, Boolean],
    okHref: String,
    cancelHref: String,
    className: String,
  },

  methods: {
    showText (val) {
      return val !== false && val != null
    },

    onCancelClick (e) {
      this.$emit('cancel', e)
    },

    onOkClick (e) {
      this.$emit('ok', e)
    },
  },
}
</script>
