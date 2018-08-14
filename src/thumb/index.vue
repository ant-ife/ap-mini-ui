<!--
component used to render a Image into a fixed aspect ratio box.
use `background-size: cover;` to fit the image

If the image is not loaded, display a default image
-->
<template>
  <div :class="{
    'ap-thumb': true,
    'ap--no-default': loaded,
  }">
    <div :style="style"></div>
  </div>
</template>

<script>
import { loadImage } from '../util/'

/**
 * The component used to render a Image into a fixed aspect ratio box.
 *
 * It use `background-size: cover;` to fit the image
 * @module component/thumb
 * @param {string} url image url
 * @param {number} ratio height / width
 */
export default {
  props: {
    url: {
      default: '',
    },

    ratio: {
      type: Number,
      default: 1,
    },
  },

  data () {
    return {
      loaded: false,
    }
  },

  created () {
    this.loadCurrentImage()
  },

  methods: {
    async loadCurrentImage () {
      const { url } = this

      if (!url) {
        this.loaded = false
        return
      }

      let loaded = false

      try {
        await loadImage(url)
        loaded = true
      } catch (e) {}

      if (url === this.url) {
        this.loaded = loaded
      }
    },
  },

  computed: {
    style () {
      const styles = {
        paddingTop: this.ratio * 100 + '%',
      }

      if (this.url && this.loaded) {
        styles.backgroundImage = `url(${this.url})`
      }

      return styles
    },
  },

  watch: {
    async url (url) {
      this.loadCurrentImage()
    },
  },
}
</script>
