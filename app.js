const http = require('http');
const express = require('express');
const adminData = require('./routes/admin');
const bodyParser = require('body-parser');
const shopRoutes = require('./routes/shop');
const path = require('path');

const app = express();

app.set('view engine', 'pug');//set pug
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended : false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminData.routes);
app.use(shopRoutes);
app.use((req, res ,next) =>{
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
    //Khong can muc nua
});
app.listen(3000);
