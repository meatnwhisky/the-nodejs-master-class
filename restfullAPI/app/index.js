
var http = require('http')
var url = require('url')

const server = http.createServer(function (req, res) {

  const parsedUrl = url.parse(req.url, true);

  const path = parsedUrl.pathname

  var trimmedpath = path.replace(/^\/+|\/+$/g, '');

  res.end('Helloooooo')

  console.log(`Request recieved at path: ${trimmedpath}`)

})

server.listen(3000, function () {
  console.log('server is listening on port 3000')
  //œ∑´®†¥¨ˆøπåß∂ƒ©˙∆˚¬…≈ç√∫˜µ≤≥≥≥«æ˜ ˜˜˜˜∫∫˜µ≈ç√∫˜µ≤≥∞§¢£™£∞§¶•ªº
})
