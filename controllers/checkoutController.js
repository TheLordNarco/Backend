const Order = require('../models/orderModel');
const Invoice = require('../models/invoiceModel');
const { generateInvoicePDF } = require('../utils/pdfGenerator');
const { sendEmail } = require('../utils/emailService');

exports.checkout = async (req, res) => {
  const userId = req.user.id;
  const { cart, paymentMethod } = req.body;

  try {
    const total = cart.reduce((sum, item) => sum + item.quantity * item.price, 0);

    const order = new Order({
      clientId: userId,
      products: cart.map(item => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
      total,
      status: 'pending',
    });
    await order.save();

    const invoice = new Invoice({
      orderId: order._id,
      clientId: userId,
      total,
    });
    await invoice.save();

    const invoicePDF = generateInvoicePDF(invoice, cart);
    sendEmail({
      to: req.user.email,
      subject: 'Factura de Compra - C24 TECH',
      text: 'Sua factura está anexada.',
      attachments: [{ filename: 'factura.pdf', content: invoicePDF }],
    });

    res.status(200).json({ message: 'Compra finalizada com sucesso.', invoice });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
