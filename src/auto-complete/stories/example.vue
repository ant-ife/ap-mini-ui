<template>
<div>
  <div class="ap-flex-row">
    <div>Foo</div>
    <div input>
      <AutoComplete
        v-model="inputValue"
        @select="handleSelect"
        :provider="dataProvider"
        placeholder="Please input here"
        :delay="500"
      >
        <div slot="empty" class="ap-dropdown-default">Empty</div>
      </AutoComplete>
    </div>
  </div>
</div>
</template>

<script>
import AutoComplete from '..'

export default {
  data () {
    return {
      inputValue: '',
    }
  },

  components: {
    AutoComplete,
  },

  methods: {
    dataProvider (value) {
      return ['Australia', 'Brazil', 'China'].filter(
        x => x.toLowerCase().indexOf(value.toLowerCase()) > -1,
      )
    },

    handleSelect (item) {
      this.inputValue = item
    },
  },
}
</script>
