<template>
  <div class="ap-auto-complete">
    <ClearInput
      :placeholder="placeholder"
      :value="value"
      @input="handleInput"
      @blur="handleBlur"
      @focus="handleFocus"
    />
    <div class="ap-dropdown-container" v-if="list">
      <div class="ap-dropdown" v-if="list.length">
        <div
          class="ap-dropdown-item"
          v-for="(item, index) in list"
          :key="index"
          @click="handleItemClick(item)"
        >
          <component
            v-if="itemComponent"
            :is="itemComponent"
            :data="item"
          />
          <div class="ap-dropdown-default" v-else>
            {{ item }}
          </div>
        </div>
      </div>
      <div class="ap-dropdown" v-else>
        <slot name="empty"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { debounce } from '../util/'
import ClearInput from '../clear-input'

/**
 * A simple autocomplete component.
 * @module auto-complete
 * @param {Component=} itemComponent custom the item component
 * @param {string} value the input value, you can use `v-model` to bind it
 * @param {Function} provider the function providing the auto complete service. It receives the current value, return a promise of matched list.
 * @param {string=} placeholder placeholder
 * @param {number} [sill=0] only when the length of value is greater or equal to sill, the component will perform the provider.
 * @param {number} delay input debouce (milliseconds).
 * @example
 * <auto-complete
 *   v-model="inputValue"
 *   provider="provider"
 *   itemComponent="CustomItem"
 * />
 * @example
 * // the props of CustomItem should match the provider returns.
 * // at this case, it should have props `id` and `name`
 * import CustomItem from './CustomItem.vue'
 *
 * const all = [{id: 1, name: '一'}, {id: 2, name: '二'}]
 *
 * export default {
 *   computed: {
 *     CustomItem: () => CustomItem,
 *   },
 *   methods: {
 *     async provider (value) {
 *       return all.filter(x => x.name.indexOf(value) > -1)
 *     },
 *   }
 * }
 */
export default {
  components: {
    ClearInput,
  },

  props: {
    itemComponent: null,
    value: String,
    placeholder: String,
    provider: Function,
    sill: {
      type: Number,
      default: 0,
    },
    delay: {
      type: Number,
      default: 300,
    },
  },

  data () {
    return {
      list: null,
    }
  },

  beforeMount () {
    this.fetchList = debounce(this.fetchList, this.delay)
  },

  methods: {
    handleBlur () {
      this.list = null
    },

    handleFocus () {
      this.fetchList(this.value)
    },

    handleInput (value) {
      this.$emit('input', value)
      this.fetchList(value)
    },

    async fetchList (search) {
      if (search.length >= this.sill) {
        // TODO fix racing
        this.list = await this.provider(search)
      } else {
        this.list = null
      }
    },

    handleItemClick (item) {
      this.$emit('select', item)
    },
  },
}
</script>
