const http = require('http');
const express = require('express');
const adminRoutes = require('./routes/admin');
const bodyParser = require('body-parser');
const shopRoutes = require('./routes/shop');

const app = express();

app.use(bodyParser.urlencoded({extended : false}));

app.use(adminRoutes);
app.use(shopRoutes);

app.listen(3000);
// const server = http.createServer(app);
// server.listen(3000);