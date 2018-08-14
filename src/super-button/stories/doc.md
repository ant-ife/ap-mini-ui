### Super Button

The button component.

Usually used with `.ap-button-container`.

```html
<div class="ap-button-container">
  <SuperButton>Click me!</SuperButton>
</div>
```

### Props

| name     | type   | default | description                                  |
| -------- | ------ | ------- | -------------------------------------------- |
| type   | `string?` | `'primary'` | button type. one of `'primary'` `'ghost'`               |
| status | `string?` | `'normal'` | button status. one of `'normal'` `'loading'` `'finished'` |

### Events

| name     | type | description |
| -------- | ------ | ---- |
| click   |  `void`  | click event |
