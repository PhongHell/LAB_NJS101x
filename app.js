const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended : false}));

app.use('/add-product', (req, res , next) => {
    res.send(`<form action='/product' method="POST"><input name= 'title' type='text'><button type='submit'>Add product</button></form>`);//default setHeader text/html
});

app.use('/product', (req, res, next) =>{
    console.log(req.body);
    res.redirect('/');
})

app.use('/', (req, res , next) => {
    res.send("<h1>Hello express.js Page !</h1>");
});



app.listen(3000);
// const server = http.createServer(app);
// server.listen(3000);