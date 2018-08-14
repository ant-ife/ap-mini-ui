### Icon

SVG icon component.

### Usage

#### Import svg files
Import svg symbol files using `svg-sprite-loader`.

```javascript
import 'path/a.svg'
```

We preset several icons, please import them:

```javascript
import 'apui/lib/icon/symbols'
```

#### Use in vue component

```html
<icon name="close" />
```

### Props

| prop         | type    | default | description                                                  |
| ---------------- | ------- | ------- | ------------------------------------------------------------ |
| name        | `string` | -        | the icon name |
