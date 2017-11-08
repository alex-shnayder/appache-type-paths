const { InputError } = require('appache/common')


exports.path = function validatePath(name, value) {
  if (typeof value !== 'string') {
    throw new InputError(
      `The value of option "${name}" must be a string`
    )
  }
}

exports.glob = function validateGlob(name, value) {
  let isValid = (typeof value === 'string')

  if (Array.isArray(value)) {
    isValid = value.every((item) => typeof item === 'string')
  }

  if (!isValid) {
    throw new InputError(
      `The value of option "${name}" must be a string or an array of strings`
    )
  }
}
