//œ∑´®†¥¨ˆøπåß∂ƒ©˙∆˚¬…≈ç√∫˜µ≤≥≥≥«æ˜ ˜˜˜˜∫∫˜µ≈ç√∫˜µ≤≥∞§¢£™£∞§¶•ªº
//install ssl command: openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem
const http = require('http')
const https = require('https')
const url = require('url')
const { StringDecoder } = require('string_decoder')
const config = require('./lib/config') //no need to specify config.js
const fs = require('fs')

var _data = require('./lib/data')
var _test = require('./test/test')
const handlers = require('./lib/handlers')
const helpers = require('./lib/helpers')
_test.symbolInObject()
_test.closureCustomUrl()
_test.symbolIteratorGenerator()
//fs functions:

//@TODO delete
// _data.create('test', 'newTestFile', { 'foo': 'poo' }, function (err) {
//   console.log('error was like this: ', err)
// })

//@TODO delete
// _data.read('test', 'newTestFile', function (err, data) {
//   console.log(`error: ${err} | data: ${data}`)
// })

//@TODO delete
// _data.update('test', 'newTestFile', { 'lala': 'land' }, function (err) {
//   console.log(`error: ${err}`)
// })

//@TODO delete
_data.delete('test', 'newTestFile', function (err) {
  console.log(`error: ${err}`)
})

//instantiate HTTP server
const httpServer = http.createServer(function (req, res) {
  unifideServer(req, res)

})

//start the HTTP server
httpServer.listen(config.httpPort, function () {
  console.log(`server is listening on port ${config.httpPort}, and enviroment is ${config.envName} mode`)
})

//ssl 
var httpsServerOptions = {
  'key': fs.readFileSync('./https/key.pem'),
  'cert': fs.readFileSync('./https/cert.pem')
}
//instantiate HTTPs server
const httpsServer = https.createServer(httpsServerOptions, function (req, res) {
  unifideServer(req, res)
})

//start HTTPs server
httpsServer.listen(config.httpsPort, function () {
  console.log(`server is listening on port ${config.httpsPort}`)

})


//all the server logic for http and https server
var unifideServer = function (req, res) {
  let parsedUrl = url.parse(req.url, true);
  let path = parsedUrl.pathname
  let queryStringObject = parsedUrl.query
  let trimmedpath = path.replace(/^\/+|\/+$/g, '');
  let method = req.method.toLowerCase()
  let headers = req.headers
  let decoder = new StringDecoder('utf-8')
  let buffer = ''

  req.on('data', function (data) {
    buffer += decoder.write(data)
  })
  req.on('end', () => {
    buffer += decoder.end()
    console.log(router[trimmedpath])
    let chosenHandler = typeof (router[trimmedpath]) !== 'undefined' ? router[trimmedpath] : handlers.notFound
    //construct the data object to send to the handler
    let data = {
      'trimmedpath': trimmedpath,
      'headers': headers,
      'queryStringObject': queryStringObject,
      'method': method,
      'payload': helpers.parsJsonToObject(buffer)
    }
    //route the request to the handler specified  in the router 
    chosenHandler(data, function (statusCode, payload) {
      //use the status code called back by the handler
      statuscode = typeof (statusCode) == 'number' ? statusCode : 200
      payload = typeof (payload) == 'object' ? payload : {}
      //convert payload to string
      let payloadString = JSON.stringify(payload)
      res.setHeader('Content-Type', 'applicationCache/json')
      res.writeHead(statusCode)
      res.end(payloadString)
      console.log('returning this response:', statusCode, payloadString)
    })

  })
}
let router = {
  'users': handlers.users,
  'ping': handlers.ping, //function that lives here and will be called on router[ping]
  'test': handlers.testHandler
}

