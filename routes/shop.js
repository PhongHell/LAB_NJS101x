const express = require('express');
const router  = express.Router();
const path = require('path');

const rootDir  = require('../util/path');

const adminData  = require('./admin');

router.get('/', (req, res , next) => {
   const products = adminData.products;
   res.render('shop', {
                        prods : products,//one object
                        pageTitle : 'Shop Page', 
                        path : '/', 
                        hasProduct :products.length > 0 , 
                        activeShop : true, 
                        productCSS : true
                     });
            });
module.exports = router ;