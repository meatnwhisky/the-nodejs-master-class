//
//container for the helpers

const config = require('./config')
const crypto = require('crypto')

var helpers = {}

//builtin to node
//create a sha256 hash
helpers.hash = function (str) {
  if (typeof (str) == 'string' && str.length > 0) {
    var hash = crypto.createHmac('sha256', config.hashingSecret).update(str).digest('hex')
    return hash
  } else return false
}

//parse JSON strnf tp an object
helpers.parsJsonToObject = function (str) {
  try {
    var obj = JSON.parse(str)
    return obj
  }
  catch (e) {
    return {}
  }
}

module.exports = helpers
