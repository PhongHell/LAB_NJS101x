const e = require('express');
const express = require('express');
const router  = express.Router();
const path = require('path');

const rootDir  = require('../util/path');

const adminData  = require('./admin');

router.get('/', (req, res , next) => {
   res.sendFile(path.join(rootDir, 'views' , 'shop.html'));
   console.log('shop.js', adminData.products);
});
module.exports = router ;