import { storiesOf } from '@storybook/vue'
import viewport from '../../stories/viewport'
import source from '../../stories/hl-source'
import usage from '../../stories/usage'

import normal from './normal.vue'
import normalRaw from '!!raw-loader!./normal.vue'

import error from './error.vue'
import errorRaw from '!!raw-loader!./error.vue'

import empty from './empty.vue'
import emptyRaw from '!!raw-loader!./empty.vue'

storiesOf('Scroll list', module)
  .add('Doc', usage(require('./doc.md')))
  .addDecorator(viewport)
  .add('normal', source(normalRaw)(() => normal))
  .add('error', source(errorRaw)(() => error))
  .add('empty', source(emptyRaw)(() => empty))
