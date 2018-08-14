<!--
Collapse.

Usage:

```
  <collapse>
    <template slot="header">
      <div>
        <div class="_icon-box _border"><icon name="trans" /></div>
      </div>
      <div>Bank Transfer</div>
    </template>

    <template slot="body">
      <div arrow="true" class="ap-flex-row">
        <div>
          <icon name="bcac1id" />
        </div>
        <div>BCA</div>
      </div>
      <div arrow="true" class="ap-flex-row">
        <div>
          <icon name="bnic1id" />
        </div>
        <div>BNI</div>
      </div>
    </template>
  </collapse>
```

Controll the open status:

```
  <collapse v-model="collapseOpen">...</collapse>
```
-->

<template>
  <div :class="['ap-collapse', {'ap--open': isOpen}]">
    <div @click="handleClick" class="ap-collapse-header ap-flex-row" :arrow="isOpen ? 'down' : 'right'">
      <slot name="header" />
    </div>
    <div :class="['ap-collapse-body ap-rows-list', bodyClass]" >
      <slot name="body" />
    </div>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'open',
    event: 'change',
  },

  props: {
    open: {
      type: Boolean,
      default: null,
    },
    bodyClass: String,
  },

  data () {
    return {
      // `selfOpen` work only if `props.open` is empty
      selfOpen: false,
    }
  },

  methods: {
    handleClick () {
      const nextOpen = !this.isOpen
      this.selfOpen = nextOpen
      this.$emit('change', nextOpen)
    },
  },

  computed: {
    isOpen () {
      if (this.open == null) {
        return this.selfOpen
      } else {
        return this.open
      }
    },
  },
}
</script>
