const Product = require('../models/product');
const Order = require('../models/order');


exports.getProducts = (req, res, next) => {
  Product.find()
    .then(products => {
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products',
        isAuthenticated: req.session.isLoggedIn
      });
    });
};

exports.getProduct = (req, res, next) => {
  const productId = req.params.productId;
  Product.findById(productId) 
    .then(product => {
      res.render('shop/product-detail', {
        product, 
        pageTitle: product.title,
        path: '/products',
        isAuthenticated: req.session.isLoggedIn
    })
  })
}

exports.getIndex = (req, res, next) => {
  Product.find()
    .then(products => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/'
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getCart = (req, res, next) => {
  req.user
    // Fetches the cart data for the current user. To be able to call a .then() on it, you have to turn it into a promise with .execPopulate().
    .populate('cart.items.productId')
    .execPopulate()
    .then(user => {
      console.log(user.cart.items);
      const products = user.cart.items;
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products,
        isAuthenticated: req.session.isLoggedIn
      })
    })
    .catch(err => console.log(err))
};

exports.postCart = (req, res, next) => {
  const productId = req.body.productId;
  Product.findById(productId)
    .then(product => {
      console.log(req.user)
      return req.user.addToCart(product);
    })
    .then(result => {
      console.log(result);
      res.redirect('/cart')
    });
}

exports.postCartDeleteProduct = (req, res, next) => {
  const productId = req.body.productId;
  req.user
    .removeFromCart(productId)
    .then(result => {
      res.redirect('/cart')
    })
    .catch(err => console.log(err))
}

exports.postOrder = (req, res, next) => {
  req.user
    .populate('cart.items.productId')
    .execPopulate()
    .then(user => {
      const products = user.cart.items.map(i => {
        return { quantity: i.quantity, product: { ...i.productId._doc } };
      });
      const order = new order({
        user: {
          email: req.user.email,
          userId: req.user
        },
        products
      });
      return order.save();
    })
    .then(result => {
      return req.user.clearCart();
    })
    .then(() => res.redirect('/orders'))
    .catch(err => console.log(err))
};

exports.getOrders = (req, res, next) => {
  Order.find({ 'user.userId': req.user._id })
    .then(orders => {
      res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
        orders: orders,
        isAuthenticated: req.session.isLoggedIn
      });
    })
    .catch(err => console.log(err));
};