<template>
  <div>
    <PullRefresh
      :onRefresh="onRefresh"
      :onScrollToBottom="onScrollToBottom"
      :autoRefresh="true"
      :hasBottom="hasMore && !error"
    >
      <slot v-if="error" name="error" />
      <slot v-else-if="list && list.length" />
      <slot v-else-if="!hasMore" name="empty" />

      <slot v-if="list && list.length && !hasMore" name="noMore" />
    </PullRefresh>
  </div>
</template>

<script>
import PullRefresh from '../pull-refresh'

/**
 * The component is a based at `pull-refresh`, used for async list fetching and rendering.
 *
 * events: `change`
 * @module component/scroll-list
 * @param {any[]} list the data list. you can just use `v-model` for binding.
 * @param {Function} loader the data load provider function.
 * @param {template} slot render the list here.
 * @param {template} slot_error render the error message here.
 * @param {template} slot_empty render the content for empty list here.
 *
 * The params of loader function are:
 *  1. `pageNum`: the page number
 *  2. `isReload`: whether should reload the list.
 *
 * The return value of loader function should be a promise of result.
 *  - `result.list`: the data list of current page
 *  - `result.hasMore`: whether has next page
 * If the provider loaded failed, it should throw a `AppError`
 */
export default {
  components: {
    PullRefresh,
  },

  model: {
    prop: 'list',
    event: 'change',
  },

  props: {
    loader: Function,
    list: Array,
  },

  data () {
    return {
      error: null,
      hasMore: true,
      pageNumber: 0,
    }
  },

  methods: {
    async onRefresh () {
      if (this.loading) return

      this.loading = true

      try {
        const res = await this.loader(1, true)

        this.$emit('change', res.list)

        this.hasMore = res.hasMore
        this.pageNumber = 1
        this.error = null
      } catch (e) {
        this.$emit('change', [])
        this.error = e
        console.error(e)
      }

      this.loading = false
    },

    async onScrollToBottom () {
      if (this.loading) return

      this.loading = true

      try {
        const nextPageNumber = this.pageNumber + 1
        const res = await this.loader(nextPageNumber, false)

        if (nextPageNumber === this.pageNumber + 1) {
          this.$emit('change', [...this.list, ...res.list])
          this.hasMore = res.hasMore
          this.pageNumber = nextPageNumber
        }
      } catch (e) {
        console.error(e)
      }

      this.loading = false
    },
  },
}
</script>
