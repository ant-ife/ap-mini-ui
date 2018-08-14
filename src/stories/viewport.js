export default () => ({
  template: '<div :style="style" class="ap-has-button"><story/></div>',
  data () {
    return {
      style: {
        width: '7.5rem',
        margin: '0 auto',
        padding: '.3rem',
      },
    }
  },
})
