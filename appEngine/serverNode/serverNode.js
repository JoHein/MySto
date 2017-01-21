const http = require('http');

const hostname = '127.0.0.1';
const port = 8081;


var server = http.createServer(function(request,response){
  console.log("connected");
  response.end();
});

server.listen(8081);
