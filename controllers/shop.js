
const fs = require('fs');
const path = require('path');
const pdfDocument = require('pdfkit');

const Order = require("../models/order");
const Product = require("../models/product");

const ITEMS_PER_PAGE = 2;

// get all products ==> /products
exports.getProducts = (req, res, next) => {
  Product.find()
    .then((products) => {
      console.log(products);
      res.render("shop/product-list", {
        prods: products,
        docTitle: "Shop",
        path: "/products",
        isAuthenticated: req.session.isLoggedIn
      });
    })
    .catch((err) => {
      const error = new Error('Error occurred.');
      res.httpStatusCode = 500;
      return next(error)
    });
};

// get a single product /products/id
exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then((product) => {
      res.render("shop/product-detail", {
        product: product,
        docTitle: product.title,
        path: "/products",
        isAuthenticated: req.session.isLoggedIn
      });
    })
    .catch((err) => {
      const error = new Error('Error occurred.');
      res.httpStatusCode = 500;
      return next(error)
    });
};

// get all products ==> /
exports.getIndex = (req, res, next) => {
  const page = req.query.page;

  Product.find()
  .skip((page - 1) * ITEMS_PER_PAGE)
  .limit(ITEMS_PER_PAGE)
    .then((products) => {
      // console.log(rows);
      res.render("shop/index", {
        prods: products,
        docTitle: "Shop",
        path: "/",
        isAuthenticated: req.session.isLoggedIn,
        csrfToken: req.csrfToken()
      });
    })
    .catch((err) => {
      const error = new Error('Error occurred.');
      res.httpStatusCode = 500;
      return next(error)
    });
};

// Cart
// get cart ==> /cart
exports.getCart = (req, res, next) => {
  req.user
    .populate("cart.items.productId")
    .then((user) => {
      let products = user.cart.items;
      console.log(products);
      res.render("shop/cart", {
        path: "/cart",
        docTitle: "Your cart",
        products: products,
        isAuthenticated: req.session.isLoggedIn
      });
    })
    .catch((err) => {
      const error = new Error('Error occurred.');
      res.httpStatusCode = 500;
      return next(error)
    });
};

// add product to cart
exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then((product) => {
      return req.user.addToCart(product);
    })
    .then((results) => {
      res.redirect("/cart");
      console.log(results);
    })
  .catch((err) => {
    const error = new Error('Error occurred.');
      res.httpStatusCode = 500;
      return next(error)
  });
};

// Delete from cart
exports.deleteCartProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .deleteFromCart(prodId)
    .then((results) => {
      console.log("deleted from cart");
      res.redirect("/cart");
    })
    .catch((err) => {
      const error = new Error('Error occurred.');
      res.httpStatusCode = 500;
      return next(error)
    });
};

exports.postOrder = (req, res, next) => {
  req.user
    .populate("cart.items.productId")
    .then(user => {
        let products = user.cart.items.map(i => {
            return {product: {...i.productId._doc}, quantity: i.quantity}    // _doc ???
        });
        console.log('products: ' + JSON.stringify(products))
        const order = new Order({
            user: {
              userId: req.user._id,
              email: req.user.email,
            },
            products: products,
          });
          console.log(order);
        return order.save();
    })
    .then((results) => {
      return req.user.clearCart();
    })
    .then(results => {
        res.redirect("/orders");
    })
    .catch((err) => {
      const error = new Error('Error occurred.');
      res.httpStatusCode = 500;
      return next(error)
    });
};

exports.getOrders = (req, res, next) => {
  Order.find({'user.userId': req.user._id})
    .then((orders) => {
      res.render("shop/orders", {
        path: "/orders",
        docTitle: "Orders",
        orders: orders,
        isAuthenticated: req.session.isLoggedIn
      });
    })
    .catch((err) => {
      const error = new Error('Error occurred.');
      res.httpStatusCode = 500;
      return next(error)
    });
};

exports.getInvoice = (req, res, next) => {
  const orderId = req.params.orderId;
  const invoiceName = 'invoice-' + orderId + '.pdf';
  const invoicePath = path.join('data', 'invoices', invoiceName);

  Order.findById(orderId)
  .then(order => {
    if (!order) {
      return next(new Error('No order'))
    }
    if (order.user.userId.toString() !== req.user._id.toString()) {
      return next(new Error('Unauthorized'))
    }

    const pdfDoc = new pdfDocument();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename="' + invoiceName + '"');

    pdfDoc.pipe(fs.createWriteStream(invoicePath));
    pdfDoc.pipe(res);

    pdfDoc.fontSize(24).text('Invoice', {
      underline: true
    });
    pdfDoc.text('----------------------')

    let totalPrice = 0;
    order.products.forEach(prod => {
      totalPrice += prod.quantity * prod.product.price;
      pdfDoc.fontSize(15).text(prod.product.title + ' - ' + prod.quantity + ' * ' + prod.product.price)
    });
    pdfDoc.text('-------');
    pdfDoc.text('Total price: ' + totalPrice);

    pdfDoc.end()
  })
  .catch(err => {
    return next(err)
  })
}

// exports.getCheckout = (req, res, next) => {
//   res.render("shop/checkout", { path: "/checkout", docTitle: "Checkout" });
// };
