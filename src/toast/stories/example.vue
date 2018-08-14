<template>
  <div class="ap-button-container ap--follow">
    <button class="ap-button ap-button-primary" @click="showToast">Normal Toast</button>
    <button class="ap-button ap-button-primary" @click="showSpin">Toast Spin</button>
  </div>
</template>

<script>
import toast from '..'

export default {
  methods: {
    showToast () {
      // will auto hide after 2s
      toast.show('hello!')
    },

    showSpin () {
      toast.spin('wait for a minute...')
      // should hide manually
      setTimeout(() => {
        toast.hide()
      }, 3000)
    },
  },
}
</script>
