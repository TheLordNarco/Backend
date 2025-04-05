const express = require('express');
const { getCart, addItemToCart, removeItemFromCart } = require('../controllers/cartController');
const router = express.Router();

router.get('/', getCart);
router.post('/', addItemToCart);
router.delete('/:id', removeItemFromCart);

module.exports = router;
