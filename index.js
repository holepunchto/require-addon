const implementation = require('#implementation')

module.exports = function addon (specifier, parentURL, opts = {}) {
  return implementation(specifier, parentURL, opts)
}
