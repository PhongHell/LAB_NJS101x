const products = [];

exports.getAddProduct = (req, res , next) => {

    res.render('add-product',{
        pageTitle : 'add-product ', 
        path : '/admin/add-product',
        productCSS : true, 
        formsCSS : true , 
        activeAddProduct : true
    });
};

exports.postAddProduct =  (req, res, next) =>{
    products.push({title : req.body.title});
    res.redirect('/');
};

exports.getProducts = (req, res , next) => {//logic of shop.js
    res.render('shop', {
            prods : products,
            pageTitle : 'Shop Page', 
            path : '/', 
            hasProduct :products.length > 0 , 
            activeShop : true, 
            productCSS : true
        });
             };

