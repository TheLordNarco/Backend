const Invoice = require('../models/invoiceModel');

exports.getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find({ clientId: req.user.id });
    res.status(200).json(invoices);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.generateInvoice = async (req, res) => {
  const { orderId, clientId, total } = req.body;

  try {
    const invoice = new Invoice({ orderId, clientId, total });
    await invoice.save();
    res.status(201).json(invoice);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
