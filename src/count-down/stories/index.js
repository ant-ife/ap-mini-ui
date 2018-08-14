import { storiesOf } from '@storybook/vue'
import viewport from '../../stories/viewport'
import source from '../../stories/hl-source'
import usage from '../../stories/usage'

import needClick from './need-click.vue'
import needClickRaw from '!!raw-loader!./need-click.vue'
import autoStart from './auto-start.vue'
import autoStartRaw from '!!raw-loader!./auto-start.vue'


storiesOf('Count Down', module)
  .add('Doc', usage(require('./doc.md')))
  .addDecorator(viewport)
  .add('need click', source(needClickRaw)(() => needClick))
  .add('auto start', source(autoStartRaw)(() => autoStart))
