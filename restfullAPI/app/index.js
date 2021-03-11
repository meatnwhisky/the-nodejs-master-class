//œ∑´®†¥¨ˆøπåß∂ƒ©˙∆˚¬…≈ç√∫˜µ≤≥≥≥«æ˜ ˜˜˜˜∫∫˜µ≈ç√∫˜µ≤≥∞§¢£™£∞§¶•ªº
//install ssl command: openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem
const http = require('http')
const https = require('https')
const url = require('url')
const { StringDecoder } = require('string_decoder')
const config = require('./config') //no need to specify config.js
const fs = require('fs')
const { callbackify } = require('util')

//instantiate HTTP server
const httpServer = http.createServer(function (req, res) {
  unifideServer(req, res)

})

//start the HTTP server
httpServer.listen(config.httpPort, function () {
  console.log(`server is listening on port ${config.httpPort}, and enviroment is ${config.envName} mode`)
  //œ∑´®†¥¨ˆøπåß∂ƒ©˙∆˚¬…≈ç√∫˜µ≤≥≥≥«æ˜ ˜˜˜˜∫∫˜µ≈ç√∫˜µ≤≥∞§¢£™£∞§¶•ªº
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
    //construnct the data object to send to the handler
    let data = {
      'trimmedpath': trimmedpath,
      'payload': buffer,
      'headers': headers,
      'queryStringObject': queryStringObject,
      'method': method
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

    // res.end('req.ended:', ' Hellooooo\n')
    // res.end('Helloooooo\n')

    //console.log('headers:', headers)
    // console.log('request payload is:', buffer)
    //console.log(`Request recieved at path: ${trimmedpath} method: ${method} and  with this query string parameters:`, queryStringObject)
  })
}

let handlers = {}

handlers.ping = function (data, callback) {
  callback(200)
}

handlers.testHandler = function (data, callback) { //gets data from chosenHandler function
  callback(403, { 'name': 'my test handler ;)' })
}
handlers.notFound = function (data, callback) {
  callback(404)
}
let router = {
  'ping': handlers.ping, //function that lives here and will be called on router[ping]
  'test': handlers.testHandler
}

