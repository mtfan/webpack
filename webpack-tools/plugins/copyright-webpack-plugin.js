class CopyrightWebpackPlugin {
  constructor(options) {
    this.options = options
  }
  apply(compiler) {
    let self = this
    // 同步
    compiler.hooks.compile.tap('CopyrightWebpackPlugin', compilation => {
      console.log('compiler')
    })

    // 异步
    compiler.hooks.emit.tapAsync('CopyrightWebpackPlugin', (compilation, cb) => {
      compilation.assets['copyright.txt'] = {
        source: function() {
          return self.options.copyright
        },
        size: function() {
          return self.options.length
        }
      }
      cb()
    })
  }
}

module.exports = CopyrightWebpackPlugin
