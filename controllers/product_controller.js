const Product = require('../models/product');
const Cart = require('../models/cart');

const findProducts = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.status(200).json(products);
    })
    .catch(err => next(err));
};

const findProduct = (req, res, next) => {
  Product.findById(req.params.id)
    .then((product) => {
      if (!product) {
        next();
      } else {
        res.status(200).json(product);
      }
    })
    .catch(err => next(err));
};

const addProduct = (req, res, next) => {
  const {
    name, category, description, price,
  } = req.body;

  Product.create({
    name,
    category,
    description,
    price,
  })
    .then((createdProduct) => {
      res.status(201).json(createdProduct);
    })
    .catch(err => next(err));
};

/* eslint no-param-reassign: "error" */
const editProduct = (req, res, next) => {
  const {
    name, category, description, price,
  } = req.body;

  Product.findById(req.params.id)
    .then((product) => {
      if (!product) {
        next();
      } else {
        product.name = name || product.name;
        product.category = category || product.category;
        product.description = description || product.description;
        product.price = price || product.price;

        product.save().then((updatedProduct) => {
          res.status(200).json(updatedProduct);
        });
      }
    })
    .catch(err => next(err));
};

const deleteProduct = (req, res, next) => {
  Product.findByIdAndDelete(req.params.id)
    .then((result) => {
      if (!result) {
        next();
      } else {
        res.status(200).json(result);
      }
    })
    .catch(err => next(err));
};

const addToCart = (req, res, next) => {
  Product.findById(req.params.id)
    .then((product) => {
      if (product) {
        Cart.addItem(req.user.id, req.params.id, req.body.quantity)
          .then((result) => {
            res.status(200).json(result);
          })
          .catch(err => next(err));
      } else {
        next();
      }
    })
    .catch(err => next(err));
};

module.exports = {
  findProducts,
  findProduct,
  addProduct,
  editProduct,
  deleteProduct,
  addToCart,
};
