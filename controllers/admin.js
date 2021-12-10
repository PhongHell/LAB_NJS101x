const Product = require("../models/product");
// const User = require("../models/user");

// const mongodb = require("mongodb");
// const ObjectId = mongodb.ObjectId;

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    docTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
    isAuthenticated: req.isLoggedIn
  });
};

// Add product
exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;
  const price = req.body.price;
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
      console.log(err);
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
        isAuthenticated: req.isLoggedIn
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// post edit
exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  // console.log(prodId);
  const updatedTitle = req.body.title;
  const updatedImageUrl = req.body.imageUrl;
  const updatedPrice = req.body.price;
  const updatedDescription = req.body.description;
  Product.findById(prodId).then(product => {
      product.title = updatedTitle;
      product.price = updatedPrice;
      product.imageUrl = updatedImageUrl;
      product.description = updatedDescription;
      product.save()
  })
    .then((results) => {
      console.log("edited product");
      res.redirect("/admin/products");
      // console.log(results);
    })
    .catch((err) => {
      console.log("post edit failed: " + err);
    });
};

// delete product
exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByIdAndRemove(prodId)
    .then((results) => {
      console.log("deleted product");
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log("delete product failed" + err);
    });
};

// get all products ==> /admin/products
exports.getProducts = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.render("admin/products", {
        prods: products,
        docTitle: "Admin Products",
        path: "/admin/products",
        isAuthenticated: req.isLoggedIn
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
