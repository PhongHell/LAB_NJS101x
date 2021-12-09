const express = require('express');
const router = express.Router();
const path = require('path');
const rootDir  = require('../util/path');

const products = [];
//admin/add-product => Get
router.get('/add-product', (req, res , next) => {

    res.render('add-product',{
        pageTitle : 'add-product ', 
        path : '/admin/add-product',
        productCSS : true, 
        formsCSS : true , 
        activeAddProduct : true
    });
});


//admin/add-product => Post
router.post('/add-product', (req, res, next) =>{
    products.push({title : req.body.title});
    res.redirect('/');
})
exports.routes = router;
exports.products = products;
