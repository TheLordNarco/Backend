const express = require('express');
const { generateInvoice, getInvoices } = require('../controllers/invoiceController');
const router = express.Router();

router.get('/', getInvoices);
router.post('/', generateInvoice);

module.exports = router;
