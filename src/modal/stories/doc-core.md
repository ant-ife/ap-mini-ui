## Modal Core

The core component that drives modal


## Props

| name         | type     | default | description                                           |
| ------------ | -------- | ---------- | ----------------------------------------------------- |
| title      | `string?`   | - | the modal title                                       |
| okText     | `string?`   | - | text of ok button, set `false` to hide the button     |
| cancelText | `string?`   | - | text of cancel button, set `false` to hide the button |
| okHref     | `string?`   | - | href of ok button |
| cancelHref | `string?`   | - | href of cancel button |
| slot       | `template?` | - | the main content                                      |
| className  | `string?`   | - | added className |

### Events

| name     | type | description |
| -------- | ------ | ---- |
| ok |  `void`  | on ok button click |
| cancel |  `void`  | on cancel button click |
