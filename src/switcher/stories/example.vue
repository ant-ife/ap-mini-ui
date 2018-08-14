<template>
  <div>
    <Switcher v-model="checked" />
    <div style="margin: 1em 0;">checked: {{ checked }}</div>
  </div>
</template>

<script>
import Switcher from '..'

export default {
  components: {
    Switcher,
  },

  data () {
    return {
      checked: false,
    }
  },
}
</script>
