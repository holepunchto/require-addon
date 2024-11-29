module.exports = function addon(specifier, parentURL) {
  throw new Error(
    `Cannot find addon '${specifier}' imported from '${parentURL}'`
  )
}
