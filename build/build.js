const path = require('path')
const { copy } = require('fs-extra')
const walkdir = require('fs-readdir-recursive')
const { compileFileToFile } = require('./vue-compiler')

const DTS_TPL_PATH = path.resolve(__dirname, './vue.d.ts.tpl')

const SRC_DIR = 'src'
const DEST_DIR = 'lib'

const EXCLUDE = /stories/

// resolve path to the root
const resolve = (...p) => path.resolve(__dirname, '../', ...p)

async function main () {

  const allSrcFiles = walkdir(resolve(SRC_DIR), path => !EXCLUDE.test(path))

  const vueFiles = allSrcFiles.filter(file => /\.vue$/.test(file))

  // compile vue and make d.ts for vue
  for (const file of vueFiles) {
    const src = resolve(SRC_DIR, file)
    const dest = resolve(DEST_DIR, file.replace(/\.vue$/, '.js'))
    const dtsDest = resolve(DEST_DIR, file.replace(/\.vue$/, '.d.ts'))

    await compileFileToFile(src, dest)
    await copy(DTS_TPL_PATH, dtsDest)
    console.log(`${file} -> ${dest}`)
  }

  // copy .less/svg/etc files from src to lib
  const rawFiles = allSrcFiles.filter(file => (
    !/\.(vue|js)$/.test(file)
  ))

  for (const file of rawFiles) {
    const src = resolve(SRC_DIR, file)
    const dest = resolve(DEST_DIR, file)
    await copy(src, dest)
  }
}

main()
