const router = require('express').Router();

const product = require('../controllers/product_controller');

const { authenticate, authorize } = require('../helpers/auth_helper');

router.get('/', product.findProducts);
router.get('/:id', product.findProduct);
router.post('/', authenticate, authorize(['admin']), product.addProduct);
router.put('/:id', authenticate, authorize(['admin']), product.editProduct);
router.delete('/:id', authenticate, authorize(['admin']), product.deleteProduct);
router.post('/:id/addToCart', authenticate, authorize(['customer']), product.addToCart);

module.exports = router;
