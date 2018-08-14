<template>
  <div ref="wrap" class="ap-digital-password">
    <div>
      <input
        ref="input"
        @input="handleInput"
        @blur="handleBlur"
        @paste.prevent
        :class="['ap-password-focus', {
          'ap-input-end': value.length === digLength
        }]"
        :style="inputBoxStyle"
        :type="attrType"
        pattern="[0-9]*"
        :disabled="disabled ? true : false"
      />
      <div
        v-for="(char, index) in values"
        :key="index"
        :class="['ap-password-item', {
          'ap--current': index === value.length,
        }]"
      >
        <i v-show="!char"></i>
        <i :class="{'ap-dot': char}" v-show="hidden && char"></i>
        <span v-show="char && !hidden">{{ char }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { device } from '../util/'

/**
 * The input box for password or sms code which has fixed length.
 *
 * events: `input` `complete`
 *
 * @module component/digital-password
 * @param {boolean} [hidden=false] hidden the content, used for password
 * @param {boolean} [autoFocus=false] focus in the box automatically. do not overdependence on it
 * @param {boolean} [autoBlur=true] if input to maxlength, auto blur.
 * @param {number} digLength the count of cells
 * @param {boolean} disabled disabled
 * @param {string} value the input value. you can also use `v-model`
 */
export default {
  props: [
    'hidden',
    'autoFocus',
    'autoBlur',
    'digLength',
    'disabled',
    'value',
  ],

  mounted () {
    this.$refs.wrap.addEventListener('click', this.click)

    if (this.autoFocus) {
      this.focus()
    }
  },

  computed: {
    inputBoxStyle () {
      let indent = this.value.length
      indent = indent === this.digLength ? (this.digLength - 1) : indent

      const percent = 1 / this.digLength * 100

      return {
        left: percent * indent + '%',
        width: percent + '%',
      }
    },

    values () {
      const arr = (this.value || '').split('')

      arr.length = this.digLength
      return arr
    },

    attrType () {
      return device.iOS ? 'text' : 'tel'
    },
  },

  methods: {
    isValidChar (char) {
      return /^\d$/.test(char)
    },

    handleInput () {
      const input = this.$refs.input
      const prevValue = this.value || ''
      // the last char in the input
      const lastChar = input.value.slice(-1)

      // reset value of input box
      input.value = ''
      setTimeout(() => {
        // 重置输入框 \u200b (Zero width space) 在Android4.4.x版本中回退按钮才能监听到input事件
        input.value = '\u200b'
      })

      let nextValue

      if (lastChar && this.isValidChar(lastChar)) {
        // add the input char to the end of previous value
        // use `slice()` to make the value not longer than max length
        nextValue = (prevValue + lastChar).slice(0, this.digLength)
      } else if (!lastChar) {
        // remove the last char of prev value
        nextValue = prevValue.slice(0, prevValue.length - 1)
      } else {
        nextValue = prevValue
      }

      // emit only if the value change
      if (nextValue !== prevValue) {
        this.$emit('input', nextValue)

        if (nextValue.length === this.digLength) {
          this.$emit('complete', nextValue)
          if (this.autoBlur !== false) {
            this.$refs.input.blur()
          }
        }
      }
    },

    handleBlur () {
      if (device.iOS) {
        this.$refs.wrap.addEventListener('click', this.click)
      }
    },

    focus () {
      this.$refs.input.focus()
    },

    blur () {
      this.$refs.input.blur()
    },

    click () {
      this.$refs.input.focus()

      // 解决ios下触发多次focus键盘数字键盘闪动问题
      if (device.iOS) {
        this.$refs.wrap.removeEventListener('click', this.click)
      }
    },
  },
}
</script>
