import Prism from 'prismjs'
import { withNotes } from '@storybook/addon-notes'

export default (text) => {
  return withNotes({
    text: `<pre class="language-javascript"><code class="language-javascript">${Prism.highlight(text, Prism.languages.javascript, 'javascript')}</code></pre>`,
  })
}
