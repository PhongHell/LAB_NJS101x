const { validationResult } = require('express-validator');

const mongoose = require('mongoose');

const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    docTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
    hasError: false,
    errorMessage: undefined,
    isAuthenticated: req.session.isLoggedIn,
    validationErrors: []
  });
};

// Add product
exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const image = req.file;

  if (!image) {
    return res.status(422).render("admin/edit-product", {
      docTitle: "Add Product",
      path: "/admin/add-product",
      editing: false,
      hasError: true,
      product: {
        title: title,
        price: price,
        description: description
      },
      errorMessage: 'Not an image file',
      isAuthenticated: req.session.isLoggedIn,
      validationErrors: []
    });
  }

  const imageUrl = image.path;
  const description = req.body.description;
  const price = req.body.price;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).render("admin/edit-product", {
      docTitle: "Add Product",
      path: "/admin/add-product",
      editing: false,
      hasError: true,
      product: {
        title: title,
        price: price,
        imageUrl: imageUrl,
        description: description
      },
      errorMessage: errors.array()[0].msg,
      isAuthenticated: req.session.isLoggedIn,
      validationErrors: errors.array()
    });
  }

  const product = new Product({
      title: title,
      imageUrl: imageUrl,
      description: description,
      price: price,
      userId: req.user._id    // can also only write req.user then mongoose will only extract the _id
  });
  product
    .save()
    .then((results) => {
      console.log(results);
      console.log("product created!");
      res.redirect("/admin/products");
    })
    .catch((err) => {
      const error = new Error('Error occurred.');
      res.httpStatusCode = 500;
      return next(error)
    });
};

// get edit page /admin/edit-product/id
exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }

  const prodId = req.params.productId;
  Product.findById(prodId)
    .then((product) => {
      if (!product) {
        return res.redirect("/");
      }
      res.render("admin/edit-product", {
        docTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        product: product,
        hasError: false,
        errorMessage: undefined,
        isAuthenticated: req.session.isLoggedIn,
        validationErrors: []
      });
    })
    .catch((err) => {
      const error = new Error('Error occurred.');
      res.httpStatusCode = 500;
      return next(error)
    });
};

// post edit
exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  // console.log(prodId);
  const updatedTitle = req.body.title;
  const image = req.file;
  const updatedPrice = req.body.price;
  const updatedDescription = req.body.description;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).render("admin/edit-product", {
      docTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: true,
      hasError: true,
      product: {
        title: updatedTitle,
        price: updatedPrice,
        description: updatedDescription,
        _id: prodId
      },
      errorMessage: errors.array()[0].msg,
      isAuthenticated: req.session.isLoggedIn,
      validationErrors: errors.array()
    });
  }

  Product.findById(prodId).then(product => {
    if (product.userId.toString() !== req.user._id.toString()) {
      return res.redirect('/')
    }
      product.title = updatedTitle;
      product.price = updatedPrice;

      if (image) {      
        product.imageUrl = image.path;
      }

      product.description = updatedDescription;
      product.save()
      .then((results) => {
        console.log("edited product");
        res.redirect("/admin/products");
        // console.log(results);
      })
  })
    .catch((err) => {
      const error = new Error('Error occurred.');
      res.httpStatusCode = 500;
      return next(error)
    });
};

// delete product
exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.deleteOne({
    _id: prodId,
    userId: req.user._id
  })
    .then((results) => {
      res.redirect("/admin/products");
    })
    .catch((err) => {
      const error = new Error('Error occurred.');
      res.httpStatusCode = 500;
      return next(error)
    });
};

// get all products ==> /admin/products
exports.getProducts = (req, res, next) => {
  Product.find({ userId: req.user._id })
    .then((products) => {
      res.render("admin/products", {
        prods: products,
        docTitle: "Admin Products",
        path: "/admin/products",
        isAuthenticated: req.session.isLoggedIn
      });
    })
    .catch((err) => {
      const error = new Error('Error occurred.');
      res.httpStatusCode = 500;
      return next(error)
    });
};
