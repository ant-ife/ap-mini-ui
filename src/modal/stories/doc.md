## Modal

Alternative to the native alert and comfirm.
Provide three method: `alert`, `confirm` and `hide`.
In most cases, you just need this to make an alert or comfirm. If you need a custom-style modal, you may need `modal-core`.

### Example

```javascript
import modal from 'component/modal'
await modal.alert('Just am alert')
const ok = await modal.confirm('Are you OK?')
```

### Methods

#### alert(message, options=opt) → {Promise.<(1|void)>}


Show a alert dialog with only one button. alternative to `window.alert`. The method will return a promise, which will be resolved when the modal terminate.

- If the promise value is 1, it indicate that the modal is closed by click,
- Else the modal is closed by `close` method or there is new modal created.

##### Parameters:

| name             | type   | Description                                |
| ---------------- | ------ | ------------------------------------------ |
| message        | `string` |                                            |
| options        | `object` |                                            |
| options.okText | `string` | the text that will show in the _OK_ button |

##### Returns:

promise that will be resolved when the modal terminate.



#### confirm(message, options=opt) → {Promise.<(0|1|void)>}


Show a alert dialog with two button (ok and cancel). alternative to window.comfirm. The method will return a promise, which will be resolved when the modal terminate.

- If the value is 0, it indicate that the modal is closed by click *Cancel*,
- If the value is 1, it indicate that the modal is closed by click _OK_,
- Else the modal is closed by `close` method or there is new modal created.

##### Parameters:

| name                 | type      | Description                                    |
| -------------------- | --------- | ---------------------------------------------- |
| message            | `string`  |                                                |
| options            | `object?` |                                                |
| options.okText     | `string?` | the text that will show in the _OK_ button     |
| options.cancelText | `string?` | the text that will show in the *Cancel* button |

##### Returns:

promise that will be resolved when the modal terminate.



#### hide(arg)


Hide the modal

##### Example

```
modal.alert('AAA').then(x => console.log(x)) // will log 'OK'
modal.hide('OK')
```

##### Parameters:

| name  | type | description                                |
| ----- | ---- | ------------------------------------------ |
| arg | `*`    | the arg will be sent to the modal promise. |
