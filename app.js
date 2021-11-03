const http = require('http');

http.createServer(function(req, res){
    console.log(req);
    res.end;
}).listen(2000);

// server = http.createServer(function(req, res){
//     console.log(req);
//     res.end;
// });
// sever.listen(3000);
