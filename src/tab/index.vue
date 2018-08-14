<template>
  <div class="ap-tabs">
    <ul>
      <li
        v-for="tab in list"
        :key="tab.id"
        :class="{ 'ap--active': value === tab.value }"
        @click="tabClick(tab)"
      >
        <span>{{ tab.name }}</span>
      </li>
    </ul>
  </div>
</template>

<script>

/**
 * Tab component
 * @module component/tab
 * @param {Tab[]} list tab list of `{value: string, name: string}`
 * @param {string} value
 * @example
 * <switcher v-model="checked" :list="[{name: 'tab.name', value: 'a'}]"/>
 */
export default {
  props: ['list', 'value'],

  model: {
    event: 'change',
  },

  methods: {
    tabClick (tab) {
      this.$emit('change', tab.value)
    },
  },
}
</script>
