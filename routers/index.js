const router = require('express').Router();

router.get('/', (req, res) => {
  res.status(200).json({
    message: 'connected to e-commerce API',
  });
});

module.exports = router;
