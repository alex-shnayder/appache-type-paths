const { InputError } = require('appache/common')


exports.path = function validatePath(name, value) {
  if (typeof value !== 'string') {
    throw new InputError(
      `The value of option "${name}" must be a string`
    )
  }
}
