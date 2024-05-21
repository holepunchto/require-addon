module.exports = function addon (referrer) {
  let msg = 'Cannot find addon \'.\''

  if (referrer) msg += ` imported from '${referrer}'`

  throw new Error(msg)
}
