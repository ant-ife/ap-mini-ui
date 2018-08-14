<template>
  <transition name="ap-fade">
    <div>
      <div :class="['ap-toast', className]" v-if="visible">
        <div>
          <spin v-if="isSpin"></spin>
          <icon v-if="isOthers" :name="icon"></icon>
          <p v-if="message">{{ message }}</p>
        </div>
      </div>
      <div v-if="visible && isSpin" class="ap-toast-spin-bg"></div>
    </div>
  </transition>
</template>

<script>
import spin from '../spin'
import icon from '../icon'

/**
 * Toast API with methods: `show` `success` `error` `spin` `hide`.
 * @module component/toast
 * @example
 * import toast from 'component/modal'
 * await toast.show('Just am toast')
 * await toast.show('toast text', { duration: Infinity, icon: 'success', className: '' })
 * await toast.success('Success')
 * await toast.error('Failed')
 * toast.spin('Loading', className: '') // the spin will return void instead of promise
 * await sleep(1000)
 * toast.hide()
 */
export default {
  components: {
    spin,
    icon,
  },

  data: () => ({
    message: null,
    visible: false,
    icon: null,
    className: '',
  }),

  computed: {
    isSpin () {
      return this.icon === 'spin'
    },

    isOthers () {
      return this.icon && this.icon !== 'spin'
    },
  },

  methods: {
    /**
     * @method show
     * @param {string} message
     * @param {Object} [options={}]
     * @param {number} [options.duration=2000] the lifetime of toast. milliseconds
     * @param {string=} options.icon icon name
     * @param {string=} options.className additional class name
     * @return {Promise<boolean|any>} the promise that will be resolved when timeout or `hide` is called or a new `show` is called.
     */
    show (message, options = {}) {
      this.hide(false)

      const {
        duration = 2000,
        icon,
        className,
      } = options

      this.message = message
      this.icon = icon
      this.visible = true
      this.className = className

      /**
       * NOTE:
       * if duration is `Infinity`, return `void` instead of `Promise`
       */
      if (duration === Infinity) return

      return new Promise(resolve => {
        /**
         * resolve promise and destory method itself
         */
        this._resolve = resolve

        this._timer = setTimeout(() => {
          this.hide(true)
        }, duration)
      })
    },

    /**
     * suger for `toast.show` with options.icon defaults to success
     * @method success
     * @return {Promise<void>}
     */
    success (message, options = {}) {
      return this.show(message, {
        ...options,
        icon: 'success',
      })
    },

    /**
     * suger for `toast.show` with options.icon defaults to success
     * @method error
     * @return {Promise<void>}
     */
    error (message, options = {}) {
      return this.show(message, {
        ...options,
        icon: 'error',
      })
    },

    /**
     * show a spin toast, which will not hide automatically.
     * @method spin
     * @return {void}
     */
    spin (message, className = '') {
      return this.show(message, {
        icon: 'spin',
        duration: Infinity,
        className,
      })
    },

    /**
     * hide the toast, resolve promise and clean
     * @method hide
     * @param {boolean} natural - return the value to toast promise.
     */
    hide (natural = false) {
      // hide UI
      this.visible = false

      // resolve promise and rm resolver
      this._resolve && this._resolve(natural)
      this._resolve = null

      // clear timer
      clearTimeout(this._timer)
    },
  },
}
</script>
