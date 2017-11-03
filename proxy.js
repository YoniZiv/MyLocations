var http = require('http');
var fetch = require('node-fetch');

http.createServer(function (req, res) {

  let contentType;
  fetch('https://maps.googleapis.com' + req.url)
    .then(function (fetchRes) {
      contentType = fetchRes.headers._headers["content-type"][0];
      return fetchRes.text();
    }).then(function (body) {

    res.setHeader('Access-Control-Allow-Origin', '*'); // <<<<<<<<<<
    res.writeHead(200, {'Content-Type':contentType});
    res.write(body);
    res.end();

  });

}).listen(8000);
