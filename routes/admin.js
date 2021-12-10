const express = require('express');
// const path = require('path');
// const rootDir = require('../util/path');

const isAuth = require('../middleware/is-auth');

const adminController = require('../controllers/admin')

const router = express.Router();

router.get('/products', isAuth, adminController.getProducts);

router.get('/add-product', isAuth, adminController.getAddProduct);

router.post('/add-product', isAuth, adminController.postAddProduct);

router.post('/edit-product', isAuth, adminController.postEditProduct);

router.get('/edit-product/:productId', isAuth, adminController.getEditProduct);

router.post('/delete-product', isAuth, adminController.postDeleteProduct);

module.exports = router;
