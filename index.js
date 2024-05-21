const implementation = require('#implementation')

module.exports = function addon (referrer, opts = {}) {
  return implementation(referrer, opts)
}
