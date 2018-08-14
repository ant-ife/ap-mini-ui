## Pull Refresh

Pull down and the data.

### Props:

| name               | type     | Default | Description                                                  |
| ------------------ | -------- | ------- | ------------------------------------------------------------ |
| onRefresh        | `function`          | - | when pull refresh, the function will perform. It should return a promise to stop the refresh spin. |
| onScrollToBottom | `function`           | - | when pull to the bottom, the function will perform. It should return a promise to stop the bottom spin. |
| hasBottom        | `boolean?`           | `false` | Whether render the bottom spin.                              |
| autoRefresh      | `boolean?`              | `false` | When mounted, auto refresh and trigger onRefresh.            |
| slot             | `template`             | -       | the main content.                                            |
