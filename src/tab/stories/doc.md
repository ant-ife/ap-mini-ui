## Tab

A simple Tab component

### Usage

```
<Tab :list="tabList" v-model="currentTabValue" />
```

### Props

| name       | type    |Default | Description |
| ---------- | ------- |------- | ----------- |
| list | `Array<{name, value}>` | - | Tab list descriptors |
| value  | `string` | - | Current tab value |


### Event

| name       | type    | Description |
| ---------- | ------- |------- | ----------- |
| change | `string` | - |
