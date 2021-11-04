const http = require('http');
const fs = require('fs');
http.createServer(function(req, res){
    const url = req.url;
    const method = req.method;
    if(url === '/'){
        res.write('<html>');
        res.write("<head><title>my page</title></head>");
        res.write('<body><form action ="/message" method="POST"><input type="text" name="message"><button type"submit">Send</button></input></form><body>');
        res.write('</html>');
        console.log(url);
       return res.end; //escape if
    }
    if(url ==='/message' && method === "POST"){
        const body = [];
        req.on('data', (chunk)=>{
            console.log(chunk);
            body.push(chunk);
        })

        req.on('end', ()=>{
             const parseBody = Buffer.concat(body).toString();
             const message = parseBody.split('=')[1];
             fs.writeFileSync('message.txt',message);
        })
       
        res.statusCode = 302;
        res.setHeader('location', '/');
        return res.end();
    }
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write("<head><title>my page</title></head>");
    res.write('<body><h1>hello from my node.js Server ?</h1><body>');
    res.write('</html>');
    res.end;
    
}).listen(3000);