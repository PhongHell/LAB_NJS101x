const http = require('http');

http.createServer(function(req, res){
    const url = req.url;
    if(url === '/'){
        res.write('<html>');
        res.write("<head><title>my page</title></head>");
        res.write('<body><form action ="/message" method="POST"><input type="text"><button type"submit">Send</button></input></form><body>');
        res.write('</html>');
        console.log(url);
       return res.end;
       
    //escape if
    }
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write("<head><title>my page</title></head>");
    res.write('<body><h1>hello from my node.js Server ?</h1><body>');
    res.write('</html>');
    res.end;
    
}).listen(3000);