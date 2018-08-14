import { configure, storiesOf } from '@storybook/vue'
import Vue from 'vue'
import usage from '../src/stories/usage'
import icon from '../src/icon/'

// load all .svg
import '../src/icon/symbols'

import './index.less'

Vue.component('icon', icon)

function loadStories() {
  storiesOf('Welcome', module)
    .add('README', usage(require('../README.md')))
  const req = require.context('../src', true, /\/stories\/index\.js$/);
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
