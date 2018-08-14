<template>
  <div>
    <Tab :list="tabs" v-model="value" />
    {{ value }}
  </div>
</template>

<script>
import Tab from '..'

export default {
  components: {
    Tab,
  },

  data () {
    return {
      value: '001',

      tabs: [
        {
          value: '001',
          name: 'Apple',
        },
        {
          value: '002',
          name: 'Orange',
        },
        {
          value: '003',
          name: 'Banana',
        },
      ],
    }
  },
}
</script>
