//container for all enviroments
var enviroments = {

}

enviroments.staging = {
  'httpPort': 3000,
  'httpsPort': 3001,
  'envName': 'staging'
}

enviroments.production = {
  'httpPort': 6000,
  'httpsPort': 6001,
  'envName': 'production'
}

//determine which enviroment was passed as a a command line argument
var currentEnviroment = typeof (process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : ''

//check the current enviroment is one of the enviroments above (default will ne staging)
var enviromentToExport = typeof (enviroments[currentEnviroment])
  == 'object' ? enviroments[currentEnviroment] : enviroments.staging

//export the module (only the enviroment)
module.exports = enviromentToExport

