const loaderUtils = require('loader-utils')
const validateOptions = require('schema-utils')
const schema = {
  type: 'object',
  properties: {
    test: {
      type: 'string'
    }
  }
}
// 异步loader
module.exports = function(source) {
  const options = loaderUtils.getOptions(this)
  validateOptions(schema, options, 'replaceLoader Example options')
  const callback = this.async()
  setTimeout(() => {
    let result = source.replace('huleia', options.name)
    callback(null, result)
  }, 3000)
}
