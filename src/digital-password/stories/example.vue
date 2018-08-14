<template>
  <div style="margin: 10px;">
    <DigitalPassword @complete="handleComplete()" v-model="password" :digLength="6" />
  </div>
</template>

<script>
import DigitalPassword from '..'

export default {
  components: {
    DigitalPassword,
  },

  data () {
    return {
      password: '',
    }
  },

  methods: {
    handleComplete () {
      this.password = ''
    },
  },
}
</script>
