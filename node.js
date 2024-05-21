const url = require('url')
const resolve = require('bare-addon-resolve')

const host = process.platform + '-' + process.arch

module.exports = function addon (referrer) {
  const parentURL = url.pathToFileURL(referrer)

  if (parentURL.pathname[parentURL.pathname.length - 1] !== '/') {
    parentURL.pathname += '/'
  }

  for (const resolution of resolve('.', parentURL, {
    host,
    extensions: [
      '.node'
    ]
  }, readPackage)) {
    switch (resolution.protocol) {
      case 'file:':
        try {
          return require(url.fileURLToPath(resolution))
        } catch {
          continue
        }
    }
  }

  let msg = 'Cannot find addon \'.\''

  if (referrer) msg += ` imported from '${referrer}'`

  throw new Error(msg)

  function readPackage (packageURL) {
    try {
      return require(url.fileURLToPath(packageURL))
    } catch (err) {
      return null
    }
  }
}
