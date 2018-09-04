const router = require('express').Router();

const cart = require('../controllers/cart_controller');

router.get('/', cart.getCart);
router.post('/:productId', cart.addItem);
router.delete('/:productId', cart.removeItem);

module.exports = router;
