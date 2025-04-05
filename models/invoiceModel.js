const mongoose = require('mongoose');

const InvoiceSchema = new mongoose.Schema({
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  total: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  receiptIssued: { type: Boolean, default: false },
});

module.exports = mongoose.model('Invoice', InvoiceSchema);
