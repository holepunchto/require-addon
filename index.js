const runtime = require('#runtime')

module.exports = function addon (specifier, parentURL, opts = {}) {
  return runtime(specifier, parentURL, opts)
}
