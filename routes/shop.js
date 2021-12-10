const express = require("express");
// const path = require('path');

// const rootDir = require('../util/path');
// const adminData = require("./admin");

const shopController = require('../controllers/shop');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

//Products

router.get("/", shopController.getIndex);

router.get('/products', shopController.getProducts);

router.get('/product/:productId', shopController.getProduct);

// // //Cart

router.get('/cart', isAuth, shopController.getCart);

router.post('/cart', isAuth, shopController.postCart);

router.post('/delete-cart-product', isAuth, shopController.deleteCartProduct);

// Order
router.post('/orders', isAuth, shopController.postOrder);

router.get('/orders', isAuth, shopController.getOrders);

router.get("/orders/:orderId", isAuth, shopController.getInvoice);

// router.get('/checkout', shopController.getCheckout);

module.exports = router;
