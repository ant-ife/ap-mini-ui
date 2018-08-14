<template>
  <div>
    <div
      class="ap-pull-down-container"
      @touchstart="onTouchStart"
      @touchmove="onTouchMove"
      @touchend="onTouchEnd"
      :style="{
        webkitTransform: `translate3d(0, -${marginTop}px, 0)`,
        transform: `translate3d(0, -${marginTop}px, 0)`,
        marginBottom: `-${marginTop}px`,
      }"
    >
      <div
        ref="pullHeader"
        class="ap-pull-down-header"
        :style="{height: `${PULL_DOWN_HEIGHT}px`}"
      >
        <spin :paused="status !== STATUS_REFRESH"></spin>
      </div>

      <slot />

      <div class="ap-pull-down-footer" v-show="status === STATUS_NEXT_PAGE">
        <spin />
      </div>
    </div>

    <!-- prevent margin collapse -->
    <div style="display: table;"></div>
  </div>
</template>

<script>
import spin from '../spin'
import { getViewportScale } from '../util/'

const isFunction = x => typeof x === 'function'

// status of pull down
const STATUS_START = 0
const STATUS_READY = 1
const STATUS_REFRESH = 2
const STATUS_NEXT_PAGE = 3

const distanceScale = 2
const transitionTime = 0.2

const viewportScale = getViewportScale()

const PULL_DOWN_HEIGHT = 56 / viewportScale
const REALEASE_HEIGHT = 90 / viewportScale * distanceScale

/**
 * Pull down and load data.
 *
 * @module component/pull-refresh
 * @param {Function} onRefresh when pull refresh, the function will perform. It should return a promise to stop the refresh spin.
 * @param {Function} onScrollToBottom when pull to the bottom, the function will perform. It should return a promise to stop the bottom spin.
 * @param {boolean} hasBottom Whether render the bottom spin.
 * @param {boolean} [autoRefresh=false] When mounted, auto refresh and trigger onRefresh.
 * @param {template} slot the main content.
 */
export default {
  name: 'pullRefresh',

  props: {
    onRefresh: {
      type: Function,
    },

    onScrollToBottom: {
      type: Function,
    },

    // TODO: now always true
    hasTop: Boolean,

    hasBottom: Boolean,

    autoRefresh: Boolean,
  },

  components: {
    spin,
  },

  data () {
    return {
      status: STATUS_START,
      marginTop: PULL_DOWN_HEIGHT,
      animating: false,
      touchPosition: {
        start: 0,
        distance: 0,
      },
      STATUS_START,
      STATUS_READY,
      STATUS_REFRESH,
      STATUS_NEXT_PAGE,
      PULL_DOWN_HEIGHT,
    }
  },

  mounted () {
    if (this.autoRefresh) {
      this.status = STATUS_READY
      this.isPullDown = true
      this.touchPosition.distance = PULL_DOWN_HEIGHT
      this.onTouchEnd()
    }

    this.addScrollListener()
  },

  destroyed () {
    this.removeScrollListener()
  },

  methods: {
    setState (status = 'start') {
      let result = ''
      switch (status) {
        case 'start':
        default:
          result = STATUS_START
          this.resetPullDown()
          break
        case 'refresh':
          result = STATUS_REFRESH
          this.marginTop = 0
          break
      }
      this.status = result
    },

    onTouchStart (e) {
      if (this.animating) {
        return
      }

      this.touchPosition.start = e.touches.item(0).pageY
    },

    onTouchMove (e) {
      if (this.animating) {
        return
      }
      if (this.status !== STATUS_START) {
        return
      }

      // If not in the top of the page, return
      if (window.scrollY > 0) {
        return
      }

      let distance = e.touches.item(0).pageY - this.touchPosition.start
      // limit the height of pull down to REALEASE_HEIGHT
      distance = distance > REALEASE_HEIGHT ? REALEASE_HEIGHT : distance
      distance = distance / distanceScale
      // update this.touchPosition and the height of pull down
      this.touchPosition.distance = distance

      if (distance > 0) {
        e.preventDefault() // for Android
        this.isPullDown = true
      } else {
        this.isPullDown = false
        return
      }

      this.marginTop = PULL_DOWN_HEIGHT - distance

      /**
       * if distance is bigger than the height of pull down
       * set the status of pull down to STATUS_READY
       */
      if (distance > PULL_DOWN_HEIGHT) {
        this.marginTop = 0
        this.status = STATUS_READY
      } else {
        /**
         * else set the status of pull down to STATUS_START
         * and rotate the icon based on distance
         */
        this.status = STATUS_START
      }
    },

    onTouchEnd () {
      if (this.animating || !this.isPullDown) {
        return
      }

      this.$refs.pullHeader.style.transition = `margin-top ${transitionTime}s ease`

      if (this.status !== STATUS_READY) {
        this.marginTop = PULL_DOWN_HEIGHT
        return
      }

      let reset = true
      // if distance is bigger than PULL_DOWN_HEIGHT
      this.animating = true

      if (this.touchPosition.distance >= PULL_DOWN_HEIGHT) {
        this.marginTop = 0
        this.status = STATUS_REFRESH

        // trigger refresh callback
        if (isFunction(this.onRefresh)) {
          setTimeout(() => {
            const res = this.onRefresh()
            // if onRefresh return promise
            if (res && isFunction(res.then)) {
              const callback = () => {
                this.resetPullDown()
                this.resetAnimation()
              }
              res.then(callback, callback)
            }
          })

          reset = false
        }
      }

      if (reset) {
        this.resetPullDown()
        this.resetAnimation()
      }

      // reset this.touchPosition
      this.touchPosition.distance = 0
      this.touchPosition.start = 0
    },

    /**
     * reset the status of pull down
     * @param {Object} pullDown the pull down
     */
    resetPullDown () {
      this.marginTop = PULL_DOWN_HEIGHT
      this.status = STATUS_START
    },

    resetAnimation () {
      setTimeout(() => {
        this.animating = false
        this.$refs.pullHeader.style.transition = ''
      }, transitionTime * 1000)
    },

    addScrollListener () {
      window.addEventListener('scroll', this.scrollToBottom, false)
    },

    removeScrollListener () {
      window.removeEventListener('scroll', this.scrollToBottom)
      this.resetPullDown()
    },

    scrollToBottom () {
      if (
        !this.hasBottom ||
        this.status !== STATUS_START ||
        this._blockBottom
      ) {
        return
      }

      // window.innerHeight is mutable
      const windowHeight = window.innerHeight

      if (this.$el.getBoundingClientRect().bottom - windowHeight < 100) {
        this.status = STATUS_NEXT_PAGE

        // resetPullDown will cause onscroll, prevent it.
        this._blockBottom = true

        const reset = () => {
          this.resetPullDown()

          setTimeout(() => {
            this._blockBottom = false
          }, 500)
        }

        // trigger callback
        if (isFunction(this.onScrollToBottom)) {
          const res = this.onScrollToBottom()
          // if onScrollToBottom return promise
          if (res && isFunction(res.then)) {
            res.then(reset, reset)
          }
        } else {
          reset()
        }
      }
    },
  },
}
</script>
