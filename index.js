const implementation = require('#implementation')

module.exports = function addon (specifier, referrer, opts = {}) {
  return implementation(specifier, referrer, opts)
}
