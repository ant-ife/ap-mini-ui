<template>
  <ModalCore v-if="show" okText="Okay" @ok="clickOk">
    <img src="https://wx2.sinaimg.cn/large/6d308bd9gy1fu8eflh7a0j2028028q2s.jpg" />
  </ModalCore>
</template>

<script>
import ModalCore from '../core'

export default {
  components: {
    ModalCore,
  },

  data () {
    return {
      show: true,
    }
  },

  methods: {
    clickOk () {
      this.show = false
    },
  },
}
</script>
