## Digtal password

Digtal password is a component for inputing fixed-length password or SMS code.

### Props

| name        | type    | default | description                                                 |
| ----------- | ------- | ------- | ----------------------------------------------------------- |
| hidden    | `boolean` | `false` | hidden the content, used for password                       |
| autoFocus | `boolean` | `false` | focus in the box automatically. do not overdependence on it |
| autoBlur  | `boolean` | `true`  | auto blur when the length of value reach the maximum        |
| digLength | `number`  | -       | the count of cells                                          |
| disabled  | `boolean` | `false` | disabled                                                    |
| value     | `string`  | -       | the input value. you can also use `v-model`                 |


### Methods

#### focus(): void

focus input

#### blur(): void

blur input

### Events

| name     | type | description |
| -------- | ------ | ---- |
| input |  `string`  | on input |
| complete |  `string`  | on input to max length |
