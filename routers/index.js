const router = require('express').Router();

const auth = require('./auth_router');
const products = require('./product_router');

router.get('/', (req, res) => {
  res.status(200).json({
    message: 'connected to e-commerce API',
  });
});

router.use('/auth', auth);
router.use('/products', products);

module.exports = router;
