<template>
  <modalCore
    v-if="visible"
    :title="title"
    :okText="okText"
    :okHref="okHref"
    :cancelText="cancelText"
    :cancelHref="cancelHref"
    :className="className"
    @ok="_handleOk"
    @cancel="_handleCancel"
  >
    {{ message }}
  </modalCore>
</template>

<script>
import modalCore from './core'

const getInitialData = () => ({
  visible: false,
  // modal title
  title: null,
  // modal content
  message: null,
  // OK button text
  okText: null,
  // cancel button text
  cancelText: null,
  // OK button href
  okHref: null,
  // cancel button href
  cancelHref: null,
  // custom className on modal root
  className: null,
})

/**
 * Alternative to the native alert and comfirm.
 * Provide three method: `alert`, `confirm` and `hide`.
 * In most cases, you just need this to make an alert or comfirm. If you need a custom-style modal, you may need `modal-core`.
 * @module component/modal
 * @example
 * import modal from 'component/modal'
 * await modal.alert('Just am alert')
 * const ok = await modal.confirm('Are you OK?')
 */
export default {
  components: {
    modalCore,
  },

  data: getInitialData,

  methods: {
    /**
     * @deprecated prefer to `.alert()`
     */
    show () /* istanbul ignore next */ {
      console.warn('`modal.show()` is deprecated prefer to `modal.alert()`')
      return this.alert.apply(this, arguments)
    },

    /**
     * the base method of `.alert()` and `.confirm()`.
     * do not use directly. use `.alert()` or `.confirm()` instead
     * @private
     * @return {Promise<0 | 1 | void>} - 0: cancel, 1: ok, void: other
     */
    _show (message, options) {
      let { okText, cancelText } = options

      /**
       * if okText is `undefined` or `null`, default to 'OK'
       * if need to hide ok-button, set it to `false`
       */
      if (okText == null) {
        okText = 'OK'
      }

      if (cancelText == null) {
        cancelText = 'Cancel'
      }

      Object.assign(this, {
        ...getInitialData(),
        ...options,
        message,
        okText,
        cancelText,
        visible: true,
      })

      this._resolve && this._resolve()

      return new Promise(resolve => {
        this._resolve = resolve
      })
    },

    /**
     * Show a alert dialog with only one button. alternative to window.alert.
     * The method will return a promise, which will be resolved when the modal terminate.
     *
     *  - If the promise value is 1, it indicate that the modal is closed by click,
     *  - Else the modal is closed by `close` method or there is new modal created.
     * @method alert
     * @param {string} message
     * @param {object} [options=]
     * @param {string=} options.okText the text that will show in the _OK_ button
     * @returns {Promise<1 | void>} promise that will be resolved when the modal terminate.
     */
    alert (message, options = {}) {
      options.cancelText = false

      return this._show(message, options)
    },

    /**
     * Show a alert dialog with two button (ok and cancel). alternative to window.comfirm.
     * The method will return a promise, which will be resolved when the modal terminate.
     *
     *  - If the value is 0, it indicate that the modal is closed by click _Cancel_,
     *  - If the value is 1, it indicate that the modal is closed by click _OK_,
     *  - Else the modal is closed by `close` method or there is new modal created.
     * @method confirm
     * @param {string} message
     * @param {object} [options=]
     * @param {string=} options.okText the text that will show in the _OK_ button
     * @param {string=} options.cancelText the text that will show in the _Cancel_ button
     * @returns {Promise<0 | 1 | void>} promise that will be resolved when the modal terminate.
     */
    confirm (message, options = {}) {
      return this._show(message, options)
    },

    /**
     * Hide the modal
     * @method hide
     * @param {*} arg the arg will be sent to the modal promise.
     * @example
     * modal.alert('AAA').then(x => console.log(x)) // will log 'OK'
     * modal.hide('OK')
     */
    hide (arg) {
      this.visible = false

      this._resolve && this._resolve(arg)
      this._resolve = null
    },

    /**
     * @private
     */
    _handleOk (e) {
      this.hide(true)
    },

    /**
     * @private
     */
    _handleCancel (e) {
      this.hide(false)
    },
  },
}
</script>
