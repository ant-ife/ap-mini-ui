const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, '.babelrc'), 'utf-8')

const babelrc = JSON.parse(content)

babelrc.presets.find(preset => {
  if (Array.isArray(preset) && preset[0] === 'env') {
    preset[1].modules = 'commonjs'
  }
})

module.exports = {
  babelrc,

  extensions: ['.js', '.vue'],

  include: [
    'lib/**/*.js',
    'lib/**/*.vue',
    'test/**/*.js',
    'test/**/*.vue'
  ],
  exclude: [
    'node_modules/**'
  ]
}
