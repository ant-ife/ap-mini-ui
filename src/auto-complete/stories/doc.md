## Auto Complete

A simple autocomplete component.

### Props

| name         | type            | default | description                                                  |
| ------------- | --------------- | -- |------------------------------------------------------------ |
| itemComponent | `Component`       | _required_ | the custom item component.                                   |
| value         | `string`          | _required_ | the input value, you can use `v-model` to bind it            |
| provider      | `(v: string) => Promise<*[]>` | _required_ | the function that provide the auto complete service. It receives the current value, return a promise of matched list. |
| placeholder   | `string`          | `''` | input placeholder                                            |
| sill          | `number`          | `0` | only when the length of value is greater or equal to sill, the component will perform the provider. |
| delay         | `number`          | `0` | input debouce time in milliseconds                           |

### Prop detail

#### provider
provider is a function that should return a promise of data list. Here is an simple example to understand:

```javascript
// <Autocomplete :provider="dataProvider">
{
  methods: {
    /**
     * @param {string} value
     * @return {Promise<*[]>}
     */
    dataProvider (value) {
      return fetch(`api?search=${value}`).then(res => res.json()).then(res => res.resultList)
    }
  },
}
```

The return can be `Promise<string[]>`, `Promise<Object[]>`, etc. If it is not `Promise<string[]>`, you should implement `itemComponent` to render the data item.

#### itemComponent

You can use custom component to render dropdown item, which take a prop `data` which is the item of data list.
The ItemComponent can be like this if the provider return a list of `{firstName, lastName}`:

```javascript
const ItemComponent = {
  template: `<div>{{ data.firstName }} {{ data.lastName }}</div>`,
  props: ['data'],
}
```

### Events

| name     | type | description |
| -------- | ------ | ---- |
| input   |  `string`  | input event, usually used with `v-modal` |
| select   |  `void`  | data item that was selected |
