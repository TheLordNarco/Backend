const express = require('express');
const { getPendingOrders, processOrder, cancelOrder } = require('../controllers/orderController');
const router = express.Router();

router.get('/', getPendingOrders);
router.post('/:id/process', processOrder);
router.delete('/:id/cancel', cancelOrder);

module.exports = router;
