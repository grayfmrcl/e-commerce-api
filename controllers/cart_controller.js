const User = require('../models/user');
const Product = require('../models/product');
const Cart = require('../models/cart');

const findUser = (req, res, next) => new Promise((resolve) => {
  User.findById(req.user.id)
    .then((user) => {
      if (user) {
        resolve();
      } else {
        next();
      }
    })
    .catch(err => next(err));
});

const findProduct = (req, res, next) => new Promise((resolve) => {
  Product.findById(req.params.productId)
    .then((product) => {
      if (product) {
        resolve();
      } else {
        next();
      }
    })
    .catch(err => next(err));
});

const getCart = (req, res, next) => {
  findUser(req, res, next).then(() => {
    Cart.findByUser(req.user.id)
      .then((cart) => {
        res.status(200).json(cart);
      })
      .catch(err => next(err));
  });
};

const addItem = (req, res, next) => {
  findUser(req, res, next).then(() => {
    findProduct(req, res, next).then(() => {
      Cart.addItem(req.user.id, req.params.productId, req.body.quantity)
        .then((result) => {
          res.status(200).json(result);
        })
        .catch(err => next(err));
    });
  });
};

const removeItem = (req, res, next) => {
  findUser(req, res, next).then(() => {
    findProduct(req, res, next).then(() => {
      Cart.removeItem(req.user.id, req.params.productId)
        .then((result) => {
          res.status(200).json(result);
        })
        .catch(err => next(err));
    });
  });
};

module.exports = {
  getCart,
  addItem,
  removeItem,
};
