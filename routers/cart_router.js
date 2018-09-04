const router = require('express').Router();

const cart = require('../controllers/cart_controller');

router.get('/', cart.getCart);
router.post('/:productId', cart.addItem);
// router.delete('/:itemId')

module.exports = router;
