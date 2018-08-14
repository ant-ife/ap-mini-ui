import { storiesOf } from '@storybook/vue'
import viewport from '../../stories/viewport'
import source from '../../stories/hl-source'
import usage from '../../stories/usage'

import exampleLoading from './loading.vue'
import exampleLoadingRaw from '!!raw-loader!./loading.vue'

storiesOf('Super Button', module)
  .add('Doc', usage(require('./doc.md')))
  .addDecorator(viewport)
  .add('loading status', source(exampleLoadingRaw)(() => exampleLoading))
