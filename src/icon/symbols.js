const icons = require.context('./symbols', true, /\.(svg|png)$/)

function importAll (r) {
  r.keys().forEach(r)
}

importAll(icons)
