const http = require('http');

http.createServer(function(req, res){
    console.log(req);
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write("<head><title>my page</title></head>");
    res.write('<body><h1>hello from node.js ?</h1><body>');
    res.write('</html>');
    res.end;
}).listen(2000);