## Scroll List

The component is a based at pull-refresh, used for async list fetching and rendering.

### Params

| name         | type    | default    | description                                                  |
| ------------ | ----------- | --- | --------------------------------------------------------- |
| list       | `Array.<any>` | - | the data list. you can just use `v-model` for binding.       |
| loader     | `function`    | - | the data load provider function.                             |
| slot       | `template`    | - | render the list here.                                        |
| slot=error | `template`    | - | render the error message here.                               |
| slot=empty | `template`    | - | render the content for empty list here. |

The params of loader function are:

- `pageNum`: the page number
- `isReload`: whether should reload the list.

The return value of loader function should be a promise of result:
- `result.list`: the data list of current page
- `result.hasMore`: whether has next page

If the provider loaded failed, it should throw a `AppError`

### Events

| name     | type | description |
| -------- | ------ | ---- |
| change |  `*[]`  | on data list change |
