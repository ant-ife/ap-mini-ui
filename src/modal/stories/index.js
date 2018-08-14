import { storiesOf } from '@storybook/vue'
import viewport from '../../stories/viewport'
import source from '../../stories/hl-source'
import usage from '../../stories/usage'

import example from './example.vue'
import exampleRaw from '!!raw-loader!./example.vue'
import exampleCore from './example-core.vue'
import exampleCoreRaw from '!!raw-loader!./example-core.vue'

storiesOf('Modal', module)
  .add('Doc', usage(require('./doc.md')))
  .add('Doc of modal-core', usage(require('./doc-core.md')))
  .addDecorator(viewport)
  .add('example', source(exampleRaw)(() => example))
  .add('example of modal-core', source(exampleCoreRaw)(() => exampleCore))
