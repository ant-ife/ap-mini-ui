## Count Down

Count down is a button that display countdown number, for frequency control.

### Props

| name         | type            | default | description                                                  |
| ------------- | --------------- | -- |------------------------------------------------------------ |
| count | `number`       | `60` | the custom item component.                                   |
| text         | `string`          | _required_ | the couting template text. use `{0}` for the number. for example `{0} seconds` |
| resume      | `number` | `null` | if set, the count-down will automatically start from the resume number |
| disabled   | `boolean`          | `null` | force to disabled/enabled. if `disabled` is not set, it will be according to the couting state. |

### Methods

#### start(num): void

start the count down

##### Params

| name         | type            | default | description                                                  |
| ------------- | --------------- | -- |------------------------------------------------------------ |
| num | `number`       | `60` | the start number. default to the `count` prop.                                |

### Events

| name     | type | description |
| -------- | ------ | ---- |
| count   |  `number`  | event when count down, value is the count number |
| click   |  `void`  | button click event |
