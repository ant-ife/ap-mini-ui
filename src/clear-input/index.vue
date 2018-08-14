<template>
  <label class="ap-clearable-input">
    <format-input
      :value="value"
      :format="format"
      :placeholder="placeholder"
      :maxlength="maxlength"
      :type="type"
      :format-advanced="formatAdvanced"
      :pattern="pattern"
      :disabled="disabled"
      :readonly="readonly"
      :autoFocus="autoFocus"
      @input="handleInput"
      @blur="handleInputBlur"
      @focus="handleInputFocus"
      ref="input"
      >
    </format-input>
    <span
      :class="['ap-clear-button', { 'ap--hidden': !value || !focused }]"
      @touchstart.prevent="touchstart"
      @touchend="touchend"
      >
      <icon name="clear"></icon>
    </span>
  </label>
</template>

<script>
import formatInput from '../format-input'
import icon from '../icon'

/**
 * Input box with a clear button.
 *
 * events: `input` `focus` `blur`
 * @module component/clear-input
 * @param {string=} format see component/format-input
 * @param {boolean=} formatAdvanced see component/format-input
 * @param {number=} maxlength naitve max length
 * @param {string=} placeholder naitve placeholder
 * @param {string=} type naitve type
 * @param {string=} pattern naitve pattern
 * @param {boolean=} disabled naitve disabled
 * @param {boolean=} readonly naitve readonly
 * @param {boolean} [hidden=false] see component/format-input
 * @param {string} value the input value. you can also use `v-model`
 */
export default {
  props: [
    'format',
    'formatAdvanced',
    'maxlength',
    'placeholder',
    'type',
    'pattern',
    'autoFocus',
    'value',
    'disabled',
    'readonly',
  ],

  components: {
    formatInput,
    icon,
  },

  data () {
    return {
      focused: false,
    }
  },

  methods: {
    /**
     * @method blur
     * blur the input
     */
    blur () {
      this.$refs.input.blur()
    },

    /**
     * @method focus
     * focus the input
     */
    focus () {
      this.$refs.input.focus()
    },

    handleClickClear () {
      this.$emit('input', '')
    },

    handleInput (value) {
      this.$emit('input', value)
    },

    handleInputBlur (e) {
      // remove the setTimeout because it looks no use
      this.focused = false
      this.$emit('blur', e)
    },

    handleInputFocus (e) {
      this.focused = true
      this.$emit('focus', e)
    },

    isTap () {
      const {
        time,
        distanceX,
        distanceY,
      } = this.tapInfo

      return time < 150 && Math.abs(distanceX) < 4 && Math.abs(distanceY) < 4
    },

    touchstart (e) {
      const toucher = e.touches[0]
      const tapInfo = this.tapInfo = {}
      tapInfo.pageX = toucher.pageX
      tapInfo.pageY = toucher.pageY
      tapInfo.startDate = Date.now()
    },

    touchend (e) {
      this._touchend(e)
      if (this.isTap()) {
        this.handleClickClear()
      }
    },

    _touchend (e) {
      const toucher = e.changedTouches[0]
      const tapInfo = this.tapInfo
      tapInfo.time = Date.now() - tapInfo.startDate
      tapInfo.distanceX = tapInfo.pageX - toucher.pageX
      tapInfo.distanceY = tapInfo.pageY - toucher.pageY
    },
  },
}
</script>
