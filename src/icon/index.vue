<template>
  <span
    :class="['ap-icon', 'ap-icon-' + name]"
    v-html="html"/>
</template>

<script>

/**
 * Icon component.
 *
 * Before use it, you need to inject the svg sprite to your DOM. The svg symbols should have an `id` attribute like `id="icon-[name]"`.
 *
 * @module component/icon
 * @param {string} name the icon name
 */
export default {
  props: [
    'name',
  ],

  computed: {
    html () {
      return `
        <svg>
          <use xlink:href="#icon-${this.name}"/>
        </svg>
      `
    },
  },
}

// In Chrome console，how to get none rectangle icon's real width
// window.__getSVGIconsWidth = () => {
//   return [].slice.call(document.querySelectorAll('symbol')).map((symbol) => {
//     let rect = symbol.viewBox.animVal
//     return rect.width === rect.height ? '' : `
//       .${symbol.id} {
//         width: ${rect.width}em / ${rect.height};
//       }
//     `
//   }).join('')
// }
</script>
