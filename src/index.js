const { next, hook, preHook } = require('appache/effects')
const modifySchema = require('./modifySchema')
const coercers = require('./coercers')
const validators = require('./validators')


const TYPES = ['path', 'glob']


function processOption(option) {
  let { config, value, inputName } = option

  if (!config || !TYPES.includes(config.type)) {
    return option
  }

  let { type, basePath } = config

  if (validators[type]) {
    validators[type](inputName, value)
  }

  if (coercers[type]) {
    value = coercers[type](basePath, value)
    option = Object.assign({}, option, { value })
  }

  return option
}


module.exports = function* typePathsPlugin() {
  yield hook('schematize', function* (schema) {
    schema = modifySchema(schema)
    return yield next(schema)
  })

  yield preHook({
    event: 'process',
    tags: ['modifyOption'],
  }, (config, command) => {
    let { options } = command

    if (!options || !options.length) {
      return
    }

    options = options.map(processOption)
    command = Object.assign({}, command, { options })

    return [config, command]
  })
}
