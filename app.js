const express = require("express");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");

const session = require("express-session");
const mongoDbSession = require("connect-mongodb-session")(session);

const csrf = require('csurf');

const flash = require('connect-flash');

const path = require("path");
// const rootDir = require('./util/path');

// user model
const User = require("./models/user");

// Controllers
const errorsController = require("./controllers/errors");

// Create app
const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

const MONGO_URI =
  "mongodb+srv://ThanhPhong:23lOQy6qMnphokd2@cluster0.n29hy.mongodb.net/shop";
const store = new mongoDbSession({
  uri: MONGO_URI,
  collection: "sessions",
});

app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use(csrf());

// add isLoggedIn && csrfToken to render
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next()
})

app.use(flash());

// Routes
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");

// Store user in request
app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  };
  
  User.findById(req.session.user._id)
    .then((user) => {
      if (!user) {
        next();
      }
      req.user = user;
      next();
    })
    .catch((err) => {
      throw new Error(err)
    });
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.get('/500', errorsController.get500);
app.use("/", errorsController.get404);

app.use((error, req, res, next) => {
  res.redirect('/500')
})

mongoose
  .connect(MONGO_URI)
  .then((results) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
