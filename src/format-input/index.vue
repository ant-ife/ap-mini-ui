<template>
  <input
    :value="value"
    :placeholder="placeholder"
    :maxlength="maxlength"
    :type="attrType"
    :pattern="pattern"
    :disabled="disabled"
    :readonly="readonly"
    :class="[{'error': showError}]"
    @focus="handleFocus"
    @blur="handleBlur"
    ref="input"
  />
</template>

<script>
import { device } from '../util/'
import formatString from '../util/format-string'

/**
 * Input box with format.
 *
 * events: `input` `focus` `blur`
 * @module component/format-input
 * @param {string=} format the format string, example '{4} {4} {4} {4}' for card number, or '{2}/{2}' for card expire (MM/YY)
 * @param {boolean=} formatAdvanced hard to describe, try it yourself.
 * @param {number=} maxlength naitve max length
 * @param {string=} placeholder naitve placeholder
 * @param {string=} type naitve type
 * @param {string=} pattern naitve pattern
 * @param {boolean=} disabled naitve disabled
 * @param {boolean=} readonly naitve readonly
 * @param {boolean} [autoFocus=false] focus in the box automatically. do not overdependence on it.
 * @param {string} value the input value. you can also use `v-model`
 * @example
 * <format-input format="{2} / {2}" v-model="expire"/>
 */
export default {
  props: [
    'format',
    'formatAdvanced',
    'maxlength',
    'placeholder',
    'type',
    'value',
    'autoFocus',
    'pattern',
    'disabled',
    'readonly',
  ],

  data () {
    return {
      showError: false,
    }
  },

  mounted () {
    this._template = this.format
    this.bind()

    if (this.autoFocus) {
      this.$refs.input.focus()
    }
  },

  computed: {
    attrType () {
      if (this.isDigital()) {
        return device.iOS ? 'text' : 'tel'
      }

      return this.type
    },

    patternReg () {
      const patternReg = this.isDigital() ? '[0-9]+' : this.pattern
      return patternReg ? new RegExp(patternReg) : null
    },
  },

  methods: {
    isDigital () {
      return this.type === 'digital'
    },

    handleFocus (e) {
      this.$emit('focus', e)
    },

    handleBlur (e) {
      this.$emit('blur', e)
    },

    /**
     * @method blur
     * blur the input
     */
    blur () {
      this.$el.blur()
    },

    /**
     * @method focus
     * focus the input
     */
    focus () {
      this.$el.focus()
    },

    isValidChar (char) {
      return this.patternReg ? this.patternReg.test(char) : true
    },

    getPureValue (raw) {
      return raw.replace(/./g, (char) => this.isValidChar(char) ? char : '')
    },

    getPureIndex (raw, index) {
      return this.getPureValue(raw.slice(0, index)).length
    },

    getCursorPos () {
      return this.$el.selectionStart
    },

    setCursorPos (index) {
      this.$el.setSelectionRange(index, index)
    },

    bind () {
      const el = this.$el
      let oldValue = el.value

      /**
       * ref: https://github.com/vuejs/vue/blob/dev/src/directives/public/model/text.js
       */
      let composition = false

      this._inputEventListener = () => {
        this.showError = false
        if (!this._template || composition) {
          this.$emit('input', el.value)
          return
        }

        const rawValue = el.value
        // 是否使用了删除键
        const isBack = oldValue.length > rawValue.length
        const {
          value,
          index,
        } = formatString(
          this.getPureValue(rawValue),
          this._template,
          this.getPureIndex(rawValue, this.getCursorPos()),
          isBack,
          this.formatAdvanced
        )
        oldValue = el.value = value
        this.$emit('input', value)
        this.setCursorPos(index)
      }

      if (device.Android) {
        const _inputEventListener = this._inputEventListener
        this._inputEventListener = () => setTimeout(_inputEventListener, 0)
      }

      this._compositionstartListener = () => { composition = true }
      this._compositionendListener = () => { composition = false }

      el.addEventListener('input', this._inputEventListener, false)
      el.addEventListener('compositionstart', this._compositionstartListener, false)
      el.addEventListener('compositionend', this._compositionendListener, false)
    },
    error () {
      this.showError = true
    },
    normalize () {
      this.showError = false
    },
  },
}
</script>
