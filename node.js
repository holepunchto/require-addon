const url = require('url')
const resolve = require('bare-addon-resolve')

const host = process.platform + '-' + process.arch
const conditions = ['node', process.platform, process.arch]
const extensions = ['.node']

module.exports = function addon (specifier, parentURL) {
  if (typeof parentURL === 'string') parentURL = url.pathToFileURL(parentURL)

  for (const resolution of resolve(specifier, parentURL, { host, conditions, extensions }, readPackage)) {
    switch (resolution.protocol) {
      case 'file:':
        try {
          return require(url.fileURLToPath(resolution))
        } catch {
          continue
        }
    }
  }

  let msg = `Cannot find addon '${specifier}'`

  if (parentURL) msg += ` imported from '${parentURL.href}'`

  throw new Error(msg)

  function readPackage (packageURL) {
    try {
      return require(url.fileURLToPath(packageURL))
    } catch (err) {
      return null
    }
  }
}
