const http = require('http')
const url = require('url')
const { StringDecoder } = require('string_decoder')
const config = require('./config') //no need to specify config.js

//instantiate HTTP server
const httpServer = http.createServer(function (req, res) {
  server(req, res)
})
//start the HTTP server
httpServer.listen(config.httpPort, function () {
})

//all the server logic for http and https server
var server = function (req, res) {
  var parsedUrl = url.parse(req.url, true);
  var path = parsedUrl.pathname
  var trimmedpath = path.replace(/^\/+|\/+$/g, '');
  var decoder = new StringDecoder('utf-8')
  var buffer = ''

  req.on('data', function (data) {
    buffer += decoder.write(data)
  })

  req.on('end', () => {
    buffer += decoder.end()
    let handler = typeof (router[trimmedpath]) !== 'undefined' ? router[trimmedpath] : handlers.notFound

    //route the request to the handler specified  in the router 
    handler(function (payload) {
      payload = typeof (payload) == 'object' ? payload : {}
      let payloadString = JSON.stringify(payload)
      res.setHeader('Content-Type', 'applicationCache/json')
      res.end(payloadString)
    })
  })
}

var handlers = {}

handlers.hello = function (callback) {
  callback({ message: 'hello, is it me you are looking 4?' })
}

handlers.notFound = function (callback) {
  callback({
    message: 'route does not exist'
  })
}

var router = {
  'hello': handlers.hello
}