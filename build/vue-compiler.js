const prettier = require('prettier')
const path = require('path')
const {
  readFile,
  writeFile,
  ensureFile,
} = require('fs-extra')

const { compiler } = require('vueify')

/**
 * Compile source code of .vue to code of .js
 * @param source
 * @param options
 */
const compile = exports.compile = async (source, filePath) => {
  return new Promise((resolve, reject) => {
    compiler.compile(source, filePath, (err, result) => {
      if (err) {
        reject(err)
      } else {
        // 1. remove continuous empty commets
        // 2. beautify code
        resolve(prettier.format(
          result.replace(/(\s*\/\/\n)+/, '\n'),
          {
            semi: false,
            parser: 'babylon',
          }))
      }
    })
  })
}

/**
 * @param sourcePath source fIle path
 * @param targetPath target file path
 */
exports.compileFileToFile = async (sourcePath, targetPath) => {
  const source = await readFile(sourcePath, 'utf-8')
  const output = await compile(source, sourcePath)
  await ensureFile(targetPath)
  await writeFile(targetPath, output)
}
