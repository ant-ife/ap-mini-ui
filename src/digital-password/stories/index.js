import { storiesOf } from '@storybook/vue'
import viewport from '../../stories/viewport'
import source from '../../stories/hl-source'
import usage from '../../stories/usage'

import example from './example.vue'
import exampleRaw from '!!raw-loader!./example.vue'

storiesOf('Digtal Password', module)
  .add('Doc', usage(require('./doc.md')))
  .addDecorator(viewport)
  .add('example', source(exampleRaw)(() => example))
