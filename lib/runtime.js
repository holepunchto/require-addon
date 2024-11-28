module.exports =
  typeof Bare !== 'undefined'
    ? { runtime: 'bare', platform: Bare.platform, arch: Bare.arch }
    : typeof process !== 'undefined'
      ? { runtime: 'node', platform: process.platform, arch: process.arch }
      : { runtime: 'unknown', platform: 'unknown', arch: 'unknown' }
