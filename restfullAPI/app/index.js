
let http = require('http');
let url = require('url');

const { StringDecoder } = require('string_decoder');

const server = http.createServer(function (req, res) {

  const parsedUrl = url.parse(req.url, true);

  const path = parsedUrl.pathname

  let queryStringObject = parsedUrl.query

  let trimmedpath = path.replace(/^\/+|\/+$/g, '');

  const method = req.method.toLowerCase()

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
})

server.listen(3000, function () {
  console.log('server is listening on port 3000')
  //œ∑´®†¥¨ˆøπåß∂ƒ©˙∆˚¬…≈ç√∫˜µ≤≥≥≥«æ˜ ˜˜˜˜∫∫˜µ≈ç√∫˜µ≤≥∞§¢£™£∞§¶•ªº
})

let handlers = {}
handlers.samplehandler = function (data, callback) { //gets data from chosenHandler function
  callback(406, { 'name': 'sample handler' })
}
handlers.testHandler = function (data, callback) { //gets data from chosenHandler function
  callback(403, { 'name': 'my test handler ;)' })
}
handlers.notFound = function (data, callback) {
  callback(404)
}
let router = {
  'sample': handlers.samplehandler, //function that lives here and will be called on router[sample]
  'test': handlers.testHandler
}

