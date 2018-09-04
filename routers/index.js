const router = require('express').Router();

const auth = require('./auth_router');
const products = require('./product_router');
const cart = require('./cart_router');

const { authenticate, authorize } = require('../helpers/auth_helper');

router.get('/', (req, res) => {
  res.status(200).json({
    message: 'connected to e-commerce API',
  });
});

router.use('/auth', auth);
router.use('/products', products);
router.use('/cart', authenticate, authorize(['customer']), cart);

module.exports = router;
