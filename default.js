module.exports = function addon (specifier, parentURL) {
  let msg = `Cannot find addon '${specifier}'`

  if (parentURL) msg += ` imported from '${parentURL}'`

  throw new Error(msg)
}
