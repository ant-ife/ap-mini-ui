<template>
  <ScrollList
    v-model="list"
    :loader="loadData"
  >
    <div v-for="i in list" :key="i" class="pull-refresh-example-item">
      <div>
        <div>{{ i }}</div>
        <img src="https://wx2.sinaimg.cn/large/6d308bd9gy1fu8eflh7a0j2028028q2s.jpg">
      </div>
    </div>
    <div slot="empty" class="empty-or-error">Empty</div>
    <div slot="error" class="empty-or-error">Error</div>
    <div slot="noMore" class="no-more">No more</div>
  </ScrollList>
</template>

<script>
import ScrollList from '..'

export default {
  components: {
    ScrollList,
  },

  data () {
    return {
      list: [],
    }
  },

  methods: {
    loadData (page, isRefresh) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const nextPage = []
          const listLen = this.list.length

          for (let i = 0; i < 10; i++) {
            nextPage.push(i + listLen)
          }

          resolve({
            hasMore: page < 4,
            list: nextPage,
          })
        }, 1500)
      })
    },
  },
}
</script>

<style lang="less">
@import './example.less';
</style>
