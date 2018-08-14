export default (html) => {
  return () => {
    return {
      data () {
        return {
          html,
        }
      },
      template: '<div class="md-wrapper" v-html="html"></div>',
    }
  }
}
