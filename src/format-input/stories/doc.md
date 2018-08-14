## Format Input

Format the input text instantly, for card number and validity.

```
<format-input format="{2} / {2}" v-model="expire"/>
```

### Props

| name         | type    | default | description                                                  |
| ---------------- | ------- | ------- | ------------------------------------------------------------ |
| format         | `string` | -        | the format string, example '{4} {4} {4} {4}' for card number, or '{2}/{2}' for card expire (MM/YY) |
| formatAdvanced | `boolean?` | `false`      | it is hard to describe...                           |
| maxlength      | `number?` | -       | naitve max length                                            |
| placeholder    | `string?` | -       | naitve placeholder                                           |
| type           | `string?` | -        | naitve type                                                  |
| pattern        | `string` | -         | regexp for filter chars                                               |
| disabled       | `boolean?` | `false`        | naitve disabled                                              |
| readonly       | `boolean?` | `false`        | naitve readonly                                              |
| autoFocus      | `boolean?` | `false` | focus in the box automatically. do not overdependence on it. |
| value          | `string` | -        | the input value. you can also use `v-model`                  |

### Methods

#### focus(): void

focus input

#### blur(): void

blur input

### Events

| name     | type | description |
| -------- | ------ | ---- |
| focus |  `void`  | - |
| blur |  `void`  | - |
| input |  `string`  | - |
