const test = require('brittle')
const { pathToFileURL } = require('url')
const fs = require('fs')
const path = require('path')
const Bundle = require('bare-bundle')
const evaluate = require('bare-bundle-evaluate')
const requireAddon = require('.')

test('basic', (t) => {
  t.is(requireAddon('.', pathToFileURL('./test/fixtures/addon/')), 42)
})

test('bundle', (t) => {
  const bundle = new Bundle()

  withRequireAddon(bundle)

  bundle
    .write(
      '/binding.js',
      "module.exports = require('require-addon')('.', __filename)",
      {
        main: true
      }
    )
    .write('/package.json', '{ "name": "addon", "addon": true }')

  t.is(
    evaluate(bundle.mount(pathToFileURL('./test/fixtures/addon/test.bundle/')))
      .exports,
    42
  )
})

test('bundle with preresolutions', (t) => {
  const bundle = new Bundle()

  withRequireAddon(bundle)

  bundle
    .write(
      '/binding.js',
      "module.exports = require('require-addon')('.', __filename)",
      {
        main: true,
        imports: {
          '.': {
            addon: {
              darwin: {
                arm64: {
                  bare: '/../fixtures/addon/prebuilds/darwin-arm64/addon.bare',
                  node: '/../fixtures/addon/prebuilds/darwin-arm64/addon.node'
                },
                x64: {
                  bare: '/../fixtures/addon/prebuilds/darwin-x64/addon.bare',
                  node: '/../fixtures/addon/prebuilds/darwin-x64/addon.node'
                }
              },
              linux: {
                arm64: {
                  bare: '/../fixtures/addon/prebuilds/linux-arm64/addon.bare',
                  node: '/../fixtures/addon/prebuilds/linux-arm64/addon.node'
                },
                x64: {
                  bare: '/../fixtures/addon/prebuilds/linux-x64/addon.bare',
                  node: '/../fixtures/addon/prebuilds/linux-x64/addon.node'
                }
              },
              win32: {
                arm64: {
                  bare: '/../fixtures/addon/prebuilds/win32-arm64/addon.bare',
                  node: '/../fixtures/addon/prebuilds/win32-arm64/addon.node'
                },
                x64: {
                  bare: '/../fixtures/addon/prebuilds/win32-x64/addon.bare',
                  node: '/../fixtures/addon/prebuilds/win32-x64/addon.node'
                }
              }
            }
          }
        }
      }
    )
    .write('/package.json', '{ "name": "addon", "addon": true }')

  t.is(evaluate(bundle.mount(pathToFileURL('./test/test.bundle/'))).exports, 42)
})

function write(bundle, keys, base = '/') {
  for (const key of keys) {
    bundle.write(path.join(base, key), fs.readFileSync(key))
  }
}

function withRequireAddon(bundle) {
  write(
    bundle,
    [
      'package.json',
      'index.js',
      'lib/runtime.js',
      'lib/runtime/bare.js',
      'lib/runtime/default.js',
      'lib/runtime/node.js'
    ],
    '/node_modules/require-addon'
  )
}
