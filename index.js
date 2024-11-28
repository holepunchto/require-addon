const url = require('url')
const resolve = require('bare-addon-resolve')
const { runtime, platform, arch } = require('./lib/runtime')

const host = platform + '-' + arch
const conditions = [platform, arch]
const extensions = []

switch (runtime) {
  case 'bare':
    conditions.push('bare', 'node')
    extensions.push('.bare', '.node')
    break
  case 'node':
    conditions.push('node')
    extensions.push('.node')
    break
}

module.exports = function addon(specifier, parentURL) {
  if (typeof parentURL === 'string') parentURL = url.pathToFileURL(parentURL)

  for (const resolution of resolve(
    specifier,
    parentURL,
    { host, conditions, extensions },
    readPackage
  )) {
    switch (resolution.protocol) {
      case 'file:':
        try {
          return require(url.fileURLToPath(resolution))
        } catch {
          continue
        }
    }
  }

  throw new Error(
    `Cannot find addon '${specifier}' imported from '${parentURL.href}'`
  )

  function readPackage(packageURL) {
    try {
      return require(url.fileURLToPath(packageURL))
    } catch (err) {
      return null
    }
  }
}
