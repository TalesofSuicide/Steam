var http = require('http');

http.createServer(function (req, res) {
  res.write("YEAH BABY I LIVE");
  res.end();
}).listen(8080);
