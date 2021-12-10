const express = require("express");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");

const session = require("express-session");
const mongoDbSession = require("connect-mongodb-session")(session);

const path = require("path");
// const rootDir = require('./util/path');

// Routes
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");

// user model
const User = require("./models/user");

// Controllers
const errorsController = require("./controllers/errors");

// Create app
const app = express();

app.set("view engine", "ejs");

// Store user in request
app.use((req, res, next) => {
  User.findById("61a04f133f2eb5c7fe7312ce")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

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

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use("/", errorsController.get404);

mongoose
  .connect(MONGO_URI)
  .then((results) => {
    app.listen(3000);
    User.findOne() // findOne with no argument give back the first one
      .then((user) => {
        if (!user) {
          const user = new User({
            name: "Phong",
            email: "lala@gmail.com",
            cart: [],
          });
          user.save();
        }
      });
  })
  .catch((err) => {
    console.log(err);
  });
