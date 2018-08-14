<template>
  <PullRefresh
    :onRefresh="onRefresh"
    :onScrollToBottom="onScrollToBottom"
    :hasBottom="hasBottom"
    :autoRefresh="true"
  >
    <div v-for="i in list" :key="i" class="pull-refresh-example-item">
      <div>
        <div>{{ i }}</div>
        <img src="https://wx2.sinaimg.cn/large/6d308bd9gy1fu8eflh7a0j2028028q2s.jpg">
      </div>
    </div>
  </PullRefresh>
</template>

<script>
import PullRefresh from '..'

export default {
  components: {
    PullRefresh,
  },

  data () {
    return {
      list: [],
      hasBottom: true,
    }
  },

  computed: {
    hasBottom () {
      return this.list.length < 40
    },
  },

  methods: {
    onRefresh () {
      return new Promise((resolve) => {
        setTimeout(() => {
          this.list = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
          resolve()
        }, 1500)
      })
    },

    onScrollToBottom () {
      return new Promise((resolve) => {
        setTimeout(() => {
          const nextPage = []
          const listLen = this.list.length
          for (let i = 0; i < 10; i++) {
            nextPage.push(i + listLen)
          }

          this.list.push(...nextPage)
          resolve()
        }, 1500)
      })
    },
  },
}
</script>

<style lang="less">
.pull-refresh-example-item {
  text-align: center;

  img {
    width: 2rem;
    height: 2rem;
  }
}
</style>
