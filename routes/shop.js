const express = require('express');
const router  = express.Router();

router.use('/', (req, res , next) => {
    res.send("<h1>Hello express.js Page !</h1>");
    next();
});
module.exports = router ;