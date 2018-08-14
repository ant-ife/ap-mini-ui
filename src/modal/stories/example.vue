<template>
  <div class="ap-button-container ap--follow">
    <button class="ap-button ap-button-primary" @click="showConfirm">common modal</button>
    <button class="ap-button ap-button-primary" @click="showAlert">alert modal</button>
  </div>
</template>

<script>
import modal from '..'

export default {
  methods: {
    showConfirm () {
      modal.confirm('Are you OK?', {
        title: 'the title',
      })
        .then(confirm => {
          if (confirm) {
            modal.alert('I am OK')
          } else {
            modal.alert('I am not OK')
          }
        })
    },

    showAlert () {
      modal.alert('Hello!')
    },
  },
}
</script>
