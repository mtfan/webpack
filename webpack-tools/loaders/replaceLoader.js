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
// 同步loader
module.exports = function(source) {
  const options = loaderUtils.getOptions(this)
  validateOptions(schema, options, 'replaceLoader Example options')
  return source.replace('huleib', options.name)
}
