## Toast

### Usage

```javascript
import toast from 'component/modal'
await toast.show('Just am toast')
await toast.show('toast text', { duration: Infinity, icon: 'success', className: '' })
await toast.success('Success')
await toast.error('Failed')
toast.spin('Loading', className: '') // the spin will return void, not promise
await sleep(1000)
toast.hide()
```

### Methods

#### show(message, optionsopt) → {Promise.<(boolean|any)>}


##### Parameters:

| name      | type     | Default | Description                                                  |
| --------- | -------- | ------- | ------------------------------------------------------------ |
| message | `string` |         |                                                              |
| options | `Object` |    |  |
| options.duration | ` number?` | `2000` | the lifetime of toast. milliseconds |
| options.icon | `string?` | | icon name |
| options.className | `string?` | | additional class name |

##### Returns:

the promise that will be resolved when timeout or `hide` is called or a new `show` is called.

#### success() → {Promise.<void>}

suger for `toast.show` with options.icon defaults to success

#### error() → {Promise.<void>}

suger for `toast.show` with options.icon defaults to success

#### spin() → {void}

show a spin toast, which will not hide automatically.

#### hide(natural)

hide the toast, resolve promise and clean

##### Parameters:

| Name      | Type      | Description                        |
| --------- | --------- | ---------------------------------- |
| natural | `boolean` | return the value to toast promise. |


