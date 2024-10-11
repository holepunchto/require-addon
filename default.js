module.exports = function addon (specifier, referrer) {
  let msg = `Cannot find addon '${specifier}'`

  if (referrer) msg += ` imported from '${referrer}'`

  throw new Error(msg)
}
