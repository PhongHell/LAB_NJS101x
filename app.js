const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
// const rootDir = require('./util/path');

// Routes
const adminRoutes = require("./routes/admin");
// const shopRoutes = require("./routes/shop");

// Controllers
// const errorsController = require("./controllers/errors");

// Database
const mongoConnect = require('./util/database').mongoConnect;

// Create app
const app = express();

app.set("view engine", "ejs");

// Store user in request
app.use((req, res, next) => {
  //
  next()
})

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
// app.use(shopRoutes);

// app.use("/", errorsController.get404);

mongoConnect(() => {
  app.listen(3000)
});
