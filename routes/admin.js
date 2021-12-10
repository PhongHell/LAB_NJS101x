const express = require("express");

const { body } = require("express-validator");

const isAuth = require("../middleware/is-auth");

const adminController = require("../controllers/admin");

const router = express.Router();

router.get("/products", isAuth, adminController.getProducts);

router.get("/add-product", isAuth, adminController.getAddProduct);

router.post(
  "/add-product",
  body("title").isString().trim().isLength({ min: 3 }),
  body("imageUrl").isURL(),
  body("price").isFloat(),
  body("description").isLength({ min: 5, max: 400 }),
  isAuth,
  adminController.postAddProduct
);

router.post(
  "/edit-product",
  body("title").isString().trim().isLength({ min: 3 }),
  body("imageUrl").isURL(),
  body("price").isFloat(),
  body("description").isLength({ min: 5, max: 400 }),
  isAuth,
  adminController.postEditProduct
);

router.get("/edit-product/:productId", isAuth, adminController.getEditProduct);

router.post("/delete-product", isAuth, adminController.postDeleteProduct);

module.exports = router;
