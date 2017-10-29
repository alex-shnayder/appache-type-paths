const { assign } = require('appache/common')


const OPTION_PROPERTIES = {
  basePath: {
    type: 'string',
    default: process.cwd(),
  },
}


module.exports = function modifySchema(schema) {
  return assign(schema, 'definitions.option.properties', OPTION_PROPERTIES)
}
